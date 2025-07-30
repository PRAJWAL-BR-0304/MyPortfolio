import { z } from 'zod';

export const ContactFormInputSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).describe("The sender's name."),
  email: z.string().email({ message: 'Please enter a valid email address.' }).describe("The sender's email address."),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).describe('The message content.'),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

export const ContactFormOutputSchema = z.object({
  success: z.boolean().describe('Whether the message was sent successfully.'),
  message: z.string().describe('A confirmation or error message.'),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;
