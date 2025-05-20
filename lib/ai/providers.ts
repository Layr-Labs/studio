import { anthropic } from '@ai-sdk/anthropic';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';



// Higher quality, streaming model
export const modelFullStreaming = new ChatGoogleGenerativeAI({
  streaming: true,
  model: "gemini-2.0-flash",
  cache: true,
});

// Fast, inexpensive, non-streaming model.
export const modelLiteGenerative = new ChatGoogleGenerativeAI({
  streaming: false, // Switch to non-streaming for classification since we only need the final result
  model: "gemini-2.0-flash",
  cache: true,
});


export const myProvider = customProvider({
  languageModels: {
    'chat-model': anthropic('claude-3-5-sonnet-latest'),
    'chat-model-reasoning': wrapLanguageModel({
      model: anthropic('claude-3-5-sonnet-latest'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    'title-model': anthropic('claude-3-5-sonnet-latest'),
    'artifact-model': anthropic('claude-3-5-sonnet-latest'),
  },
  // note image models are not supported via the anthropic provider & api, this section is removed for now.
});