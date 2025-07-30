'use server';

/**
 * @fileOverview An AI chat agent that answers questions about Prajwal B R based on his resume data.
 *
 * - chat - A function to handle the chat interaction.
 */

import { ai } from '@/ai/genkit';
import { resumeData } from '@/data/resume';
import { projects } from '@/data/projects';
import {
  ChatInput,
  ChatInputSchema,
  ChatOutput,
  ChatOutputSchema,
} from '@/ai/schemas/chat-schema';


// Serialize the resume and projects data into a string for the prompt
const resumeContext = JSON.stringify(resumeData, null, 2);
const projectsContext = JSON.stringify(projects, null, 2);

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatPrompt = ai.definePrompt({
    name: 'chatPrompt',
    input: { schema: ChatInputSchema },
    output: { schema: ChatOutputSchema },
    prompt: `You are a helpful AI assistant for Prajwal B R's portfolio website. 
    Your goal is to answer questions from visitors about Prajwal's skills, experience, and projects.
    You must answer based *only* on the information provided in the following resume and projects data.
    Do not make up any information. If the answer is not in the data, say that you don't have that information.
    Keep your answers concise and friendly.

    Resume Data:
    \`\`\`json
    ${resumeContext}
    \`\`\`

    Projects Data:
    \`\`\`json
    ${projectsContext}
    \`\`\`

    User's Question:
    {{{question}}}
    `,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { output } = await chatPrompt(input);
    return output!;
  }
);
