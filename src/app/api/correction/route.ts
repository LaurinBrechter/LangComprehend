import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai'

export async function POST(req: NextRequest, res: NextResponse) {

    const body = await req.json();

    console.log(body);

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: "Say this is a test" }],
        model: "gpt-3.5-turbo",
    });


    return NextResponse.json({ success: chatCompletion.choices[0].message }, { status: 200 })
}