import type { UIMessage } from 'ai';
import type { Session } from 'next-auth';

// External libraries
import { ChatAnthropic } from "@langchain/anthropic";
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";

// Internal absolute imports
import { logContentForDebug, logStreamForDebug } from '@/lib/utils/debugUtils';

// Internal relative imports
import { classifyUserIntent } from './intentManager';
import { UserIntent } from './types';
import { basicPrompt, stage1IdeasPrompt, stage2DesignPrompt, stage3PrototypePromptTaskList, stage3PrototypePromptCodeGeneration } from './prompts';


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

export async function generateBatchLLMResponse(
  messages: UIMessage[], 
  selectedChatModel?: string,
  initialIntent?: UserIntent
) {

  
  

  console.log('chat-stream-executor: initialIntent:', initialIntent ?? 'no initial intent provided');
  // Determine intent: Use initialIntent if provided, otherwise classify
  let intent: UserIntent;
  if (initialIntent) {
    intent = initialIntent;
    console.log('chat-stream-executor: initial intent provided:', intent);
  } else {
    intent = await classifyUserIntent(messages);
  }
  console.log('chat-stream-executor: intent used:', intent);
  
  let systemPrompt = basicPrompt;

  // Update the system prompt based on the user intent using explicit if-else
  if (intent === UserIntent.RefineIdea) {
    systemPrompt = await stage1IdeasPrompt();
  } else if (intent === UserIntent.GenerateDesign) {
    systemPrompt = await stage2DesignPrompt();

  } else if (intent === UserIntent.GenerateCode) {

    systemPrompt = await stage3PrototypePromptCodeGeneration();
  } // else, keep the basicPrompt

  logContentForDebug(systemPrompt, `chat-stream-executor-system-prompt.txt`, 'Chat Stream Executor - System Prompt');

  try {
    
    // Prepend system prompt to the message history
    // Convert UI messages to LangChain format

    const messageHistory = [
      new SystemMessage(systemPrompt),
      ...convertUIMessagesToLangChainMessages(messages)
    ];
    
    // Get the current model to use
    const modelToUse = getModelProvider(selectedChatModel);
    const llmResponse = await modelToUse.invoke(messageHistory);
    console.log('chat-batch-executor: llmResponse:', llmResponse);
    return llmResponse;

  } catch (error) {
    console.error("LLM response generation failed:", error);
    throw error; // Rethrow to be handled by the POST handler
  }
}







