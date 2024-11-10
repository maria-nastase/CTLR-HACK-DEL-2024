import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const openai = new OpenAI();


let conversationHistory = [];

export async function POST(req) {
  console.log( "what is going on here", process.env.API_KEY_OPENAI)

  try {
    const { text } = await req.json();

    conversationHistory.push({ role: 'user', content: `Give suggestions for this debate argument: "${text}"` });

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: conversationHistory,
    });

    const assistantResponse = completion.choices[0].message.content;

    // Add the assistant's response to the conversation history
    conversationHistory.push({ role: 'assistant', content: assistantResponse });

    return NextResponse.json({ score: assistantResponse });
  } catch (error) {
    console.error("Error translating text:", error);
    return NextResponse.json({ error: 'Failed to process the request.' }, { status: 500 });
  }
}