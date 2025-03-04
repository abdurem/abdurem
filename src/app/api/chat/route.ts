import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openaiClient = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'X-Title': 'Portfolio Chat',
  },
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const response = await openaiClient.chat.completions.create({
      model: 'deepseek/deepseek-chat:free',
      messages,
      temperature: 0.7,
      max_tokens: 500,
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(content);
          }
        }
        controller.close();
      },
    });

    return new Response(stream);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    );
  }
}