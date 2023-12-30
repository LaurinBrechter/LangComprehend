"use server"

import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import QuestionAnswer from "@/app/components/QuestionAnswer"
import WsGenerateForm from "@/app/components/WsGenerateForm"
import WorksheetHeader from "@/app/components/WorksheetHeader"


// function char_to_


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

  const chunk_end_idx = result.chunkEndId
  const n_paras = chunk_end_idx.length
  const lang = result.language
  const text = result.text?.toString("utf8")

  return (
    <div className="h-[90%] bg-slate-300 px-24 pt-10 flex">
      <div className="w-2/6 mr-4 bg-slate-100 h-[80%] rounded-lg p-4">
        {
          result.name ? <WorksheetHeader name={result.name} id={result.id} /> : ""
        }
        <div className="flex gap-2 my-4 flex-wrap">
          {result.topics.map((topic: string) => { return (<button className="btn btn-sm">{topic}</button>) })}
        </div>
        {result.name ?
          <QuestionAnswer questions={result.questions} /> :
          <div className='w-full'>
            {<WsGenerateForm language={lang} id={result.id} worksheet_name={result.name} text={result.text?.toString()} />}
          </div>}
      </div>
      <div className="w-4/6 bg-slate-100 h-[80%] overflow-scroll p-4 rounded-lg flex flex-wrap gap-2">
        {
          text.split(" ").map((token: string, idx: number) => <p className="font-medium hover:bg-violet-600">{token}</p>)
        }
      </div>
    </div>

  )
}