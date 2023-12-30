"use server";

import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { getSubtitles } from 'youtube-captions-scraper';


function YouTubeGetID(url: string) {
  const video_id = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return (video_id[2] !== undefined) ? video_id[2].split(/[^0-9a-z_\-]/i)[0] : video_id[0];
}


// function getLangAvailable(url:string) {
//   return gapi.client.youtube.captions.list({
//     "part": [
//       "snippet"
//     ],
//     "videoId": "AKOemOyfXVg"
//   })
// }



export const getVideoData = async (userId: string, formData: FormData) => {
  "use server"

  const prisma = new PrismaClient()

  const language = formData.get("target-language") as string
  const url = formData.get("youtube-link") as string

  const yt_id = YouTubeGetID(url)

  console.log("Getting captions")

  try {

    const captions = await getSubtitles({
      videoID: yt_id, // youtube video id
      lang: language // default: `en`
    })

    let full_text = ""

    for (let i = 0; i < captions.length; i++) {
      full_text += captions[i].text
    }

    const result = await prisma.worksheets.create({
      data: {
        language: language,
        text: Buffer.from(full_text, "utf8"),
        userId: userId,
      }
    })

    redirect("/library/" + result.id)

  } catch {
    redirect("/library")
  }


}