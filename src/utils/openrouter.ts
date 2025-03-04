export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function getAIResponse(messages: Message[], onChunk: (chunk: string) => void) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }

    if (!response.body) {
      throw new Error('No response body');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      onChunk(chunk);
    }

    return '';
  } catch (error) {
    console.error('Error getting AI response:', error);
    return 'I apologize, but I encountered an error. Please try again.';
  }
} 