"use server";

import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

export const getVideoData = async (userId: string, formData: FormData) => {
  "use server"

  console.log(userId)

  const prisma = new PrismaClient()

  let language = formData.get("target-language") as string
  const url = formData.get("youtube-link") as string

  let params = { language: language, url: url }
  let url_w_query = "http://localhost:8000/worksheet/downloadVideo" + '?' + (new URLSearchParams(params)).toString();
  const res = await fetch(url_w_query)
  const data = await res.json()

  const result = await prisma.worksheets.create({
    data: {
      language: language,
      text: Buffer.from(data.video_text, "utf8"),
      userId: userId,
    }
  })

  redirect("/library/" + result.id)
}