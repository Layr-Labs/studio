import { ChatOpenAI } from '@langchain/openai';
import { openai } from '@ai-sdk/openai';

import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';

const OPENAI_MODEL_FULL_STREAMING = process.env.OPENAI_MODEL_FULL_STREAMING;
const OPENAI_MODEL_LITE_GENERATIVE = process.env.OPENAI_MODEL_LITE_GENERATIVE;

console.log('[AI Providers] OPENAI_MODEL_FULL_STREAMING:', OPENAI_MODEL_FULL_STREAMING);
console.log('[AI Providers] OPENAI_MODEL_LITE_GENERATIVE:', OPENAI_MODEL_LITE_GENERATIVE);

// Higher quality, streaming model
export const modelFullStreaming = new ChatOpenAI({
  streaming: true,
  model: OPENAI_MODEL_FULL_STREAMING,
  cache: true,
});

// Fast, inexpensive, non-streaming model.
export const modelLiteGenerative = new ChatOpenAI({
  streaming: false, // Switch to non-streaming for classification since we only need the final result
  model: OPENAI_MODEL_LITE_GENERATIVE,
  cache: true,
});


export const myProvider = customProvider({
  languageModels: {
    'chat-model': openai('OPENAI_MODEL_LITE_GENERATIVE'),
    'chat-model-reasoning': wrapLanguageModel({
      model: openai('OPENAI_MODEL_LITE_GENERATIVE'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    'title-model': openai('OPENAI_MODEL_LITE_GENERATIVE'),
    'artifact-model': openai('OPENAI_MODEL_LITE_GENERATIVE'),
  }
});