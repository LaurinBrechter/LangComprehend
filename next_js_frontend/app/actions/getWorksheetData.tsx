"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

async function getWorksheet(formData: FormData) {

  let id = Number(formData.get("id"))
  let text = formData.get("text")
  let language = formData.get("language")
  let name = formData.get("worksheet-name")
  let num_questions = formData.get("num-questions")

  const prisma = new PrismaClient()

  let params = { language: language, num_questions: num_questions, name: name }
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
      name: name
    }
  })

  revalidatePath("/library/" + id)
}

export default getWorksheet