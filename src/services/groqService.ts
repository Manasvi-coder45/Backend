import { Groq } from 'groq-sdk';
import { ChatMessage } from '../types';

if (!process.env.GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY is required in .env file. Please add it and restart the server.');
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are an empathetic and supportive mental wellness chatbot. Your role is to:
- Listen actively and respond with understanding
- Provide gentle guidance and support
- Use a warm, caring tone
- Avoid giving medical advice
- Encourage professional help when appropriate
- Maintain appropriate boundaries
- Focus on emotional support and coping strategies

Remember to be patient, non-judgmental, and supportive in your responses.`;

export async function getChatCompletion(messages: ChatMessage[]): Promise<string> {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 1024,
    });

    return completion.choices[0]?.message?.content || 'I apologize, but I am unable to respond at the moment.';
  } catch (error) {
    console.error('Error in Groq API call:', error);
    throw new Error('Failed to get response from AI service');
  }
} 