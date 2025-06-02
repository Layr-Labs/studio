import React from 'react';
import { Markdown } from '@/components/markdown';

export default function LLMDisclosurePage() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4">
      <Markdown>{llmDisclosureText}</Markdown>
    </main>
  );
}

const llmDisclosureText = `
# LLM Disclosure

The Studio Platform is powered by the following LLMs. Please see their policies for more information:

- [OpenAI Policies](https://openai.com/policies/)


`; 