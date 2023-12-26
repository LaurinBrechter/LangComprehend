import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"
import QuestionAnswer from "@/app/components/QuestionAnswer"
import WsGenerateForm from "@/app/components/WsGenerateForm"

export default async function WorksheetDetails({ params }: { params: { worksheetId: number } }) {

	const ws_id = Number(params.worksheetId)

	if (isNaN(ws_id)) { { notFound() } }

	const prisma = new PrismaClient()
	const result = await prisma.worksheets.findUnique({
		where: {
			id: Number(params.worksheetId)
		}
	})

	if (!result) {
		notFound()
	}

	const text = result.text?.toString("utf8")

	return (
		<div className="h-[90%] bg-slate-300 px-24 pt-10 flex">
			<div className="w-2/6 mr-4">
				<h1 className="mt-4">{result.name}</h1>
				<div className="flex gap-2 my-4 flex-wrap">
					{result.topics.map((topic: string) => { return (<button className="btn btn-sm">{topic}</button>) })}
				</div>
				{result.name ?
					<QuestionAnswer questions={result.questions} answers={result.answers} /> :
					<div className='w-full'>
						{<WsGenerateForm id={result.id} worksheet_name={result.name} text={result.text?.toString()} />}
					</div>}
			</div>
			<div className="w-4/6 bg-slate-200 mt-4 h-[80%] overflow-scroll p-4 rounded-lg">
				{text}
			</div>
		</div>

	)
}