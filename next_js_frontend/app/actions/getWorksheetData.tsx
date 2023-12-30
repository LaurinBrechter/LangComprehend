"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

async function getWorksheet(id: number, text: string, language: string, formData: FormData) {

  let num_questions = formData.get("num-questions")
  let worksheet_name = formData.get("worksheet-name") as string

  const prisma = new PrismaClient()

  let params = { language: language, num_questions: num_questions, name: worksheet_name }
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
      id: id
    },
    data: {
      questions: data.questions,
      topics: data.topics,
      name: worksheet_name,
      chunkEndId: data.chunk_end_idx,
      chunkStartId: data.chunk_start_idx
    }
  })

  revalidatePath("/library/" + id)
}

export default getWorksheet