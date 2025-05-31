import type { UIMessage } from 'ai';
import type { Session } from 'next-auth';

// External libraries
import { AIMessage, AIMessageChunk, HumanMessage, SystemMessage } from '@langchain/core/messages';


// Internal absolute imports
import { logContentForDebug, logStreamForDebug } from '@/lib/utils/debugUtils';

// Internal relative imports
import { classifyUserIntent } from './intentManager';
import { UserIntent } from './types';
import { basicPrompt, stage1IdeasPrompt, stage2DesignPrompt, stage3TaskListPrompt, stageProgessionPrompt, stage4CodeGenerationPrompt } from './prompts';
import { generateZipFromJSONString, validateCodeProjectJSON, appendJSONToHelloWorld } from '../code/generate-code-project';
import type { CodeFile } from '../code/generate-code-project';
import { EIGEN_LAYER_AVS_FORM_URL } from '@/lib/constants';
import { modelFullStreaming } from './providers';
import { getCachedLLMResponse, setCachedLLMResponse } from '../db/queries';
import { getMostRecentUserMessage } from '../utils';


interface ExecuteChatStreamParams {
  dataStream: any; // Using 'any' for now as CoreDataStream seems incorrect
  session: Session;
  messages: UIMessage[];
  selectedChatModel: string;
  systemPrompt: string;
  userMessage: UIMessage;
  id: string; // chat id
  isProductionEnvironment: boolean;
}

// Convert UI messages to LangChain message format
function convertUIMessagesToLangChainMessages(messages: UIMessage[]) {
  return messages.map(message => {
    const content = typeof message.content === 'string' 
      ? message.content 
      : JSON.stringify(message.content);
      
    if (message.role === 'user') {
      return new HumanMessage(content);
    } else if (message.role === 'assistant') {
      return new AIMessage(content);
    }
    // Skip system messages as we'll add a separate system message
    return null;
  }).filter((message): message is HumanMessage | AIMessage => message !== null); // Type guard to remove null values
}


export async function generateStreamingLLMResponse(
  messages: UIMessage[], 
  selectedChatModel?: string,
  initialIntent?: UserIntent
) {

  console.log('chat-stream-executor: initialIntent provided:', initialIntent ?? 'no initial intent provided');
  // Determine intent: Use initialIntent if provided, otherwise classify
  let intent: UserIntent;
  if (initialIntent) {
    intent = initialIntent;
  } else {
    intent = await classifyUserIntent(messages);
  }
  console.log('chat-stream-executor: intent used:', intent);
  

  // Set the system prompt based on the user intent using explicit if-else
  let systemPrompt = basicPrompt;
  if (intent === UserIntent.RefineIdea) {
    systemPrompt = await stage1IdeasPrompt();
  } else if (intent === UserIntent.GenerateDesign) {
    systemPrompt = await stage2DesignPrompt();
  } else if (intent === UserIntent.GenerateTaskList) {
    systemPrompt = await stage3TaskListPrompt();
  } else if (intent === UserIntent.GenerateCode) {
    systemPrompt = await stage4CodeGenerationPrompt();
  } // else, keep the basicPrompt

  // Add the stage progression prompt to the system prompt
  systemPrompt = systemPrompt + stageProgessionPrompt;

  logContentForDebug(systemPrompt, `chat-stream-executor-system-prompt.txt`, 'Chat Stream Executor - System Prompt');

  // Prepend system prompt to the message history
  const messageHistory = [
    new SystemMessage(systemPrompt),
    ...convertUIMessagesToLangChainMessages(messages)
  ];

  const userMessage = getMostRecentUserMessage(messages);
  // Serialize messageHistory for caching
  const promptString = JSON.stringify(userMessage?.content);

  try {
    // Get the raw stream from the model
    let llmResponseStream: ReadableStream<any>;
    if (intent === UserIntent.GenerateCode) {
      let responseText;
      // Try cache first
      const cachedResponse = await getCachedLLMResponse(promptString);
      if (cachedResponse) {
        console.log('chat-stream-executor: cached response found');
        responseText = cachedResponse;
      } else {
        console.log('chat-stream-executor: No cached response found');
        try {
          console.log('chat-stream-executor: invoking model to generate code project json');
          const codeProjectChunk = await modelFullStreaming.invoke(messageHistory);
          console.log('chat-stream-executor: code project json chunk generated');
          let codeProjectJSONString = codeProjectChunk.content?.toString() ?? '';
          console.log('chat-stream-executor: code project json generated');
          logContentForDebug(codeProjectJSONString, `chat-stream-executor-codeProjectJSON.txt`, 'Code Project JSON');
          console.log(`chat-stream-executor:codeProjectJSONString.length:`, codeProjectJSONString.length)
          await validateCodeProjectJSON(codeProjectJSONString);
          const appendedJson = await appendJSONToHelloWorld(codeProjectJSONString);
          let files: CodeFile[];
          files = JSON.parse(codeProjectJSONString);        
          responseText = 'Please download your project code here:\n [**Custom AVS Project Download Link**]('
            + await generateZipFromJSONString(appendedJson) + ')'
            + '\n\nThe following files have been modified for your project:\n * '
            + files.map(file => file.path).join('\n * ')
            + '\n\n Your project code is a modification of the [hello-world-avs](https://github.com/Layr-Labs/hello-world-avs) project code.'
            + '\n\nWant to discuss your AVS idea with a member of the EigenLayer team? Fill out [this form](' + EIGEN_LAYER_AVS_FORM_URL + ") and we'll be in touch soon.";
          // Cache the response
          await setCachedLLMResponse(promptString, responseText);
        } catch (err) {
          console.log('chat-stream-executor: error generating code project json', err);
          responseText = "Unable to generate downloadable project code due to AI response processing error.\n\nPlease raise an issue in the github repo for this project and include a screenshot of your prompt.";
        }
      }
      llmResponseStream = new ReadableStream({
        start(controller) {
          controller.enqueue(responseText);
          controller.close();
        }
      });
    } else {
      // Try cache first for non-code generation
      const cachedResponse = await getCachedLLMResponse(promptString);
      if (cachedResponse) {
        llmResponseStream = new ReadableStream({
          start(controller) {
            controller.enqueue(cachedResponse);
            controller.close();
          }
        });
      } else {
        // Stream from LLM, buffer, then cache
        const stream = await modelFullStreaming.stream(messageHistory);
        const reader = stream.getReader();
        let fullResponse = '';
        llmResponseStream = new ReadableStream({
          async start(controller) {
            while (true) {
              const { value, done } = await reader.read();
              if (done) break;
              controller.enqueue(value);
              if (typeof value === 'string') {
                fullResponse += value;
              } else if (value && value.toString) {
                fullResponse += value.toString();
              }
            }
            controller.close();
            // Cache the full response
            await setCachedLLMResponse(promptString, fullResponse);
          }
        });
      }
    }

    // Todo: filter out backticks here?
      

    const [llmResponseStreamCopy1, llmResponseStreamCopy2] = llmResponseStream.tee();
    // log the stream copy without holding up your response
    logStreamForDebug(
      llmResponseStreamCopy1, 
      `llm-stream-${Date.now()}.txt`,
      'Raw LLM response'
    );


    return llmResponseStreamCopy2;


  } catch (error) {
    console.error("LLM response generation failed:", error);
    throw error; // Rethrow to be handled by the POST handler
  }
}




