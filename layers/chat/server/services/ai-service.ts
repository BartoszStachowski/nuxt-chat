import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import type { ModelMessage, LanguageModel } from 'ai';

export const createOpenAiModel = (apiKey: string) => {
  const openai = createOpenAI({
    apiKey,
  });

  return openai('gpt-5-nano');
};

export async function generateChatResponse(
  model: LanguageModel,
  messages: ModelMessage[]
) {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error('Invalid messages format');
  }

  const response = await generateText({
    model,
    messages,
  });

  return response.text.trim();
}
