import { z } from 'zod';

export const ChatInputSchema = z.object({
  question: z.string().min(1, { message: 'Question cannot be empty.' }).describe("The user's question."),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ChatOutputSchema = z.object({
  answer: z.string().describe('The AI assistant\'s answer.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;
