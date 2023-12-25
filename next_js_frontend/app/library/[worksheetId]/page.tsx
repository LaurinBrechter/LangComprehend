"use server"

import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"
import QuestionAnswer from "@/app/components/QuestionAnswer"





export default async function WorksheetDetails({ params }: { params: { worksheetId: number } }) {

	const ws_id = Number(params.worksheetId)

	if (isNaN(ws_id)) {
		{
			notFound()
		}
	}

	const prisma = new PrismaClient()
	const result = await prisma.worksheets.findUnique({
		where: {
			id: Number(params.worksheetId)
		}
	})

	if (!result) {
		notFound()
	}

	const CC = (questions: string[], answers: string[]) => {
		"use client";

		console.log(result.questions)
	}

	const text = result.text?.toString("utf8")

	async function getWorksheet(formData: FormData) {

		const prisma = new PrismaClient()

		console.log(result.id)

		let name = formData.get("worksheet-name")
		let num_questions = formData.get("num-questions")

		let params = { language: result?.language, num_questions: num_questions, name: name }
		let url_w_query = "http://localhost:8000/worksheet/generateWorksheet" + '?' + (new URLSearchParams(params)).toString();

		const res = await fetch(url_w_query, {
			method: 'POST',
			body: JSON.stringify({ text: text }),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			cache: "no-cache"
		})
		const data = await res.json()

		await prisma.worksheets.update({
			where: {
				id: result.id
			},
			data: {
				questions: data.questions,
				topics: data.topics,
				name: name
			}
		})

		revalidatePath("/library/" + result.id)
	}

	return (
		<div className="h-[90%] bg-slate-300 px-24 py-16">
			<h1>Worksheet Details  {result.name}</h1>
			<div className="flex gap-4 mt-4">
				{result.topics.map((topic: string) => { return (<div className="btn">{topic}</div>) })}
			</div>
			<div className="w-full bg-slate-700 mt-4 h-[500px] overflow-scroll">{text}</div>
			{result.name ?
				<QuestionAnswer questions={result.questions} answers={result.answers} /> :
				<div className='w-3/5'>
					{<form className='bg-gray-300 p-3 flex items-center gap-4 h-[10%]' action={getWorksheet}>
						<button className='btn'>Generate</button>
						<input id="worksheet-name" type="text" placeholder="Name your worksheet" className="input" name="worksheet-name" />
						<input type="number" placeholder="Number of Questions" className="input w-full max-w-xs" id='num-questions' name="num-questions" />
					</form>}
				</div>}
		</div>

	)
}