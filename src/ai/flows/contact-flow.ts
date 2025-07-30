'use server';

/**
 * @fileOverview Handles contact form submissions by sending an email via Resend.
 *
 * - sendContactMessage - A function to process the contact form data.
 */

import { ai } from '@/ai/genkit';
import {
  ContactFormInput,
  ContactFormInputSchema,
  ContactFormOutput,
  ContactFormOutputSchema,
} from '@/ai/schemas/contact-schema';
import { Resend } from 'resend';

// IMPORTANT: Ensure you have RESEND_API_KEY, RESEND_TO_EMAIL, and RESEND_FROM_EMAIL in your .env file
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
const toEmail = process.env.RESEND_TO_EMAIL;
// On Resend's free plan, emails can only be sent from a verified domain or `onboarding@resend.dev`.
const fromEmail = process.env.RESEND_FROM_EMAIL;

export async function sendContactMessage(input: ContactFormInput): Promise<ContactFormOutput> {
  return contactFlow(input);
}

const contactFlow = ai.defineFlow(
  {
    name: 'contactFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async (input) => {
    if (!resend || !toEmail || !fromEmail) {
      console.error('Resend is not fully configured. Required environment variables (RESEND_API_KEY, RESEND_TO_EMAIL, RESEND_FROM_EMAIL) might be missing.');
      return {
        success: false,
        message: 'Email service is not configured on the server.',
      };
    }

    try {
      await resend.emails.send({
        to: toEmail,
        from: fromEmail,
        subject: `New Message from ${input.name} via Portfolio`,
        reply_to: input.email, // This ensures your replies go to the user's email
        html: `<p>Name: ${input.name}</p><p>Email: ${input.email}</p><p>Message: ${input.message}</p>`,
      });

      return {
        success: true,
        message: `Thanks for your message, ${input.name}! I'll get back to you soon.`,
      };
    } catch (error) {
      console.error('Resend API Error:', error);
      return {
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again later.',
      };
    }
  }
);
