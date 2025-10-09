import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import type { ModelMessage, LanguageModel } from 'ai';

export const createOpenAiModel = (apiKey: string) => {
  const openai = createOpenAI({
    apiKey,
  });

  return openai('gpt-5-nano');
};

export const generateChatResponse = async (
  model: LanguageModel,
  messages: ModelMessage[]
) => {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error('Invalid messages format');
  }

  const response = await generateText({
    model,
    messages,
  });

  return response.text.trim();
};

export const generateChatTitle = async (
  model: LanguageModel,
  firstMessage: string
): Promise<string> => {
  const response = await generateText({
    model,
    messages: [
      {
        role: 'system',
        content: 'Summarize the message in 3 or less short worlds.',
      },
      {
        role: 'user',
        content: firstMessage,
      },
    ],
  });
  return response.text.trim();
};
