import dotenv from 'dotenv';
dotenv.config();
console.log('GROQ_API_KEY:', process.env.GROQ_API_KEY ? 'Loaded' : 'Missing');

import express from 'express';
import cors from 'cors';
import { ChatRequest, ChatResponse, ChatMessage } from './types';
import { getChatCompletion } from './services/groqService';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body as ChatRequest;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const messages: ChatMessage[] = [
      { role: 'user', content: message }
    ];

    const response = await getChatCompletion(messages);
    
    const chatResponse: ChatResponse = {
      response
    };

    res.json(chatResponse);
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ 
      error: 'An error occurred while processing your request',
      details: error instanceof Error ? error.message : error
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 