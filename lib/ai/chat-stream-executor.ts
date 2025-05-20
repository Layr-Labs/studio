import type { UIMessage } from 'ai';
import type { Session } from 'next-auth';

// External libraries
import { ChatAnthropic } from "@langchain/anthropic";
import { AIMessage, AIMessageChunk, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";

// Internal absolute imports
import { logContentForDebug, logStreamForDebug } from '@/lib/utils/debugUtils';

// Internal relative imports
import { classifyUserIntent } from './intentManager';
import { UserIntent } from './types';
import { basicPrompt, stage1IdeasPrompt, stage2DesignPrompt, stage3PrototypePromptTaskList, stage3PrototypePromptCodeGeneration, stageProgessionPrompt } from './prompts';
import { appendJSONToHelloWorld as prependHelloWorldToJSON, generateZipFromJSONString, validateCodeProjectJSON, appendJSONToHelloWorld } from '../code/generate-code-project';
import type { CodeFile } from '../code/generate-code-project';
import { EIGEN_LAYER_AVS_FORM_URL } from '@/lib/constants';


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


// Get the appropriate LLM model based on selected chat model
function getModelProvider(selectedChatModel?: string) {
  console.log('chat-stream-executor: Using model:', selectedChatModel);
  
  if (!selectedChatModel) {
    selectedChatModel = 'gemini';
  }

  switch(selectedChatModel) {
    case 'claude':
      return new ChatAnthropic({
        streaming: true,
        model: "claude-3-7-sonnet-latest",
      });
    case 'chatgpt':
      return new ChatOpenAI({
        streaming: true,
        model: "gpt-4o-mini",
      });
    case 'gemini':
      return new ChatGoogleGenerativeAI({
        streaming: true,
        model: "gemini-2.5-pro-preview-03-25",
      });
    default:
      console.log('Unknown model, defaulting to ChatGPT');
      return new ChatOpenAI({
        streaming: true,
        model: "gpt-4o-mini",
      });
  }
}

function concatStreams<T>(stream1: ReadableStream<T>, stream2: ReadableStream<T>): ReadableStream<T> {
  return new ReadableStream<T>({
    async start(controller) {
      // Helper to pipe a stream into the controller
      async function pipeStream(stream: ReadableStream<T>) {
        const reader = stream.getReader();
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
        } finally {
          reader.releaseLock();
        }
      }
      // Pipe first stream, then second stream
      await pipeStream(stream1);
      await pipeStream(stream2);
      controller.close();
    }
  });
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
    systemPrompt = await stage3PrototypePromptTaskList();
  } else if (intent === UserIntent.GenerateCode) {
    systemPrompt = await stage3PrototypePromptCodeGeneration();
  } // else, keep the basicPrompt

  // Add the stage progression prompt to the system prompt
  systemPrompt = systemPrompt + stageProgessionPrompt;

  logContentForDebug(systemPrompt, `chat-stream-executor-system-prompt.txt`, 'Chat Stream Executor - System Prompt');

  // Prepend system prompt to the message history
  const messageHistory = [
    new SystemMessage(systemPrompt),
    ...convertUIMessagesToLangChainMessages(messages)
  ];

  // Get the current model to use
  const selectedModelProvider = getModelProvider(selectedChatModel);

  try {
    
    
    // Get the raw stream from the model
    let llmResponseStream: ReadableStream<any>;
    if (intent === UserIntent.GenerateCode) {
      
      // TODO modify prompt to generate the full hello world code project json
    
      let responseText;
      try {
        
          // const codeProjectJSON = tempCodeProjectJSON;
        console.log('chat-stream-executor: invoking model to generate code project json');
        console.time('chat-stream-executor: code project json generation');
        const codeProjectChunk = await selectedModelProvider.invoke(messageHistory);
        console.timeEnd('chat-stream-executor: code project json generation');
        console.log('chat-stream-executor: code project json chunk generated');
        
        let codeProjectJSONString = codeProjectChunk.content?.toString() ?? ''; 
        console.log('chat-stream-executor: code project json generated');
        
        
        logContentForDebug(codeProjectJSONString, `chat-stream-executor-codeProjectJSON.txt`, 'Code Project JSON');
        await validateCodeProjectJSON(codeProjectJSONString);

        
        console.log(`chat-stream-executor:codeProjectJSONString.length:`, codeProjectJSONString.length)
        if (codeProjectJSONString.length < 10){
          // If codeProjectJSONString.length < 10, most likely the llm did not generate the entire codebase. So manually append the hello world code to the codeProjectJSONString
          //todo uncomment after testing codeProjectJSONString = prependHelloWorldToJSON(codeProjectJSONString);
        }

        // manually append the hello world code to the codeProjectJSONString to include any files not generated by the llm
        const appendedJson = await appendJSONToHelloWorld(codeProjectJSONString);
      

        let files: CodeFile[];
        files = JSON.parse(codeProjectJSONString);        
        responseText = 'Please download your project code here:\n [**Custom AVS Project Download Link**]('

          + await generateZipFromJSONString(appendedJson) + ')'
          + '\n\nThe following files have been modified for your project:\n * '
          + files.map(file => file.path).join('\n * ')
          + '\n\n Your project code is a modification of the [hello-world-avs](https://github.com/Layr-Labs/hello-world-avs) project code.'
          + '\n\nWant to discuss your AVS idea with a member of the EigenLayer team? Fill out [this form](' + EIGEN_LAYER_AVS_FORM_URL + ") and we'll be in touch soon.";

      } catch (err) {
        console.log('chat-stream-executor: error generating code project json', err);
        responseText = "Unable to generate downloadable project code due to llm response json formatting error. Please raise an issue in the github repo for this project and we'll fix it as soon as possible.";
      }
      
      llmResponseStream = new ReadableStream({
        start(controller) {
          controller.enqueue(responseText);
          controller.close();
        }
      });
    } else {
      llmResponseStream = await selectedModelProvider.stream(messageHistory);
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




