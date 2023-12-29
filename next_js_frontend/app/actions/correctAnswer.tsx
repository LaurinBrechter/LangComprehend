"use server"

import OpenAI from "openai";

export default async function correctAnswer(prevState: [], formData: FormData) {

    const msg = formData.get("user-msg") as string

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    console.log(msg)

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "Please state whether the following sentence is grammatically correct or not." },
        { role: "user", content: msg }],
        model: "gpt-3.5-turbo",
    });

    let correction = chatCompletion.choices[0].message

    return { "response": correction.content }
}