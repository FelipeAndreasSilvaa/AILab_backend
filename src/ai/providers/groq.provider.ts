import Groq from 'groq-sdk';

export const GROQ_CLIENT = 'GROQ_CLIENT';

export const GroqProvider = {
  provide: GROQ_CLIENT,
  useFactory: () => {
    return new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  },
};