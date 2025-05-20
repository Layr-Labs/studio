import { z } from 'zod';
import { modelLiteGenerative } from '@/lib/ai/providers';
import type { UIMessage } from 'ai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { UserIntent } from './types'; // Import from the new file

// Schema for the intent classification output
const IntentClassificationSchema = z.object({
  intent: z.enum([
    UserIntent.RefineIdea,
    UserIntent.GenerateDesign, 
    UserIntent.GenerateTaskList, 
    UserIntent.GenerateCode,
    UserIntent.Other
  ]).describe("The classified intent of the user's messages")
});

// First LLM: classify intent
export async function classifyUserIntent(messages: UIMessage[]): Promise<UserIntent> {

  // Create a model with structured output
  const structuredModel = modelLiteGenerative.withStructuredOutput(IntentClassificationSchema);

  const systemPrompt = `
    You are a classifier.
    Given the user's recent messages, determine:
    1) Refine idea
    2) Generate design
    3) Build prototype (start with task list if not yet generated)
    4) Generate code (if task list created)
    5) Other
    Classify the intent based on the conversation.
  `;

  // Only use the last few messages for intent classification to improve efficiency
  const recentMessages = messages.slice(-3);
  const userText = recentMessages.map(m => m.content).join("\n");

  try {
    const result = await structuredModel.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userText)
    ]);

    // Result is already structured according to our schema
    return result.intent;
  } catch (error) {
    console.error("Intent classification failed:", error);
    return UserIntent.Other; // Fallback to Other on error
  }
}
