"use server"

import OpenAI from "openai";

export default async function correctAnswer(prevState: [], formData: FormData) {

    const msg = formData.get("user-msg") as string
    const question_context = formData.get("question_context") as string
    const question = formData.get("question") as string

    console.log(question_context)

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const grammar_correction = await openai.chat.completions.create({
        messages: [{
            role: "system", content: `Please state whether the following sentence is grammatically 
        correct or not and why. Give your answer in the same language as the text. 
        Please address the user directly` },
        { role: "user", content: msg }],
        model: "gpt-4-1106-preview",
    });

    const content_correction = await openai.chat.completions.create({
        messages: [
            {
                role: "system", content: `You are given a question and a context. 
        Please specify if the user's answer answers the question. question: ${question} context: ${question_context}. 
        Please address the user directly. 
        Do not reveal the answer to the question in your response.`
            },
            { role: "user", content: msg }],
        model: "gpt-3.5-turbo",
    });

    return {
        "response__grammar": grammar_correction.choices[0].message.content,
        "response__content": content_correction.choices[0].message.content
    }
}