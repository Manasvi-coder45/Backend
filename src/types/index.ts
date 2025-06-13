export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
  error?: string;
} 