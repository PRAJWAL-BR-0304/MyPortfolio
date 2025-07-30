import {genkit, GenkitPlugin} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import dotenv from 'dotenv';

dotenv.config();

const plugins: (GenkitPlugin | Promise<GenkitPlugin>)[] = [];

// Conditionally load the Google AI plugin only if an API key is provided.
// This prevents the app from crashing if the key is missing.
if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) {
  plugins.push(googleAI());
}

// Only set a default model if the googleAI plugin is likely to be loaded.
// If no plugins are loaded, Genkit will run in a no-op mode without a model.
export const ai = genkit({
  plugins,
  ...(plugins.length > 0 && { model: 'googleai/gemini-2.0-flash' }),
});
