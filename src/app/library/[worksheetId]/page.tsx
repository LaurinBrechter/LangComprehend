"use server"

import { notFound } from "next/navigation"
import QuestionAnswer from "@/components/QuestionAnswer"
import WsGenerateForm from "@/components/WsGenerateForm"
import WorksheetHeader from "@/components/WorksheetHeader"
import { drizzle } from "drizzle-orm/node-postgres"
import { worksheetsTable } from "@/db/schema"
import { eq } from "drizzle-orm"


export default async function WorksheetDetails({ params }: { params: { worksheetId: number } }) {

  const ws_id = Number(params.worksheetId)
  const db = drizzle(process.env.DATABASE_URL!)

  if (isNaN(ws_id)) { { notFound() } }

  const worksheets = await db.select().from(worksheetsTable).where(eq(worksheetsTable.id, ws_id))
  const worksheet = worksheets[0]

  if (!worksheet) {
    notFound()
  }

  const lang = worksheet.language
  const text = worksheet.text?.toString("utf8")

  let question_context = []

  for (let i = 0; i < worksheet.questions.length; i++) {
    question_context.push(worksheet.textArray.slice(worksheet.chunkStartId[i], worksheet.chunkEndId[i]).join(" "))
  }

  return (
    <div className="h-[90%] bg-slate-300 px-24 pt-10 flex">
      <div className="w-2/6 mr-4 bg-slate-100 h-[80%] rounded-lg p-4">
        {
          worksheet.name ? <WorksheetHeader name={worksheet.name} id={worksheet.id} /> : ""
        }
        <div className="flex gap-2 my-4 flex-wrap">
          {worksheet.topics.map((topic: string) => { return (<button className="btn btn-sm">{topic}</button>) })}
        </div>
        {worksheet.name ?
          <QuestionAnswer
            questions={worksheet.questions}
            question_context={question_context}
            chunkEndIdx={worksheet.chunkEndId}
            chunkStartIdx={worksheet.chunkStartId} /> :
          <div className='w-full'>
            {<WsGenerateForm language={lang} id={worksheet.id} worksheet_name={worksheet.name} text={text} />}
          </div>}
      </div>
      <div className="w-4/6 bg-slate-100 h-[80%] overflow-scroll p-4 rounded-lg flex flex-wrap gap-2">
        {
          worksheet.textArray.map((token: string, idx: number) => <p className="font-medium hover:bg-violet-600" id={"chunk-" + idx}>{token}</p>)
        }
      </div>
    </div>

  )
}