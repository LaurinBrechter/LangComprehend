"use server";

import { worksheetsTable } from '@/db/schema';
import { drizzle } from 'drizzle-orm/node-postgres';
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

  const language = formData.get("target-language") as string
  const url = formData.get("youtube-link") as string

  const yt_id = YouTubeGetID(url)

  console.log("Getting captions")

  const captions = await getSubtitles({
    videoID: yt_id, // youtube video id
    lang: language // default: `en`
  })

  console.log(captions)

  let full_text = ""

  for (let i = 0; i < captions.length; i++) {
    full_text += captions[i].text
  }

  console.log(full_text)

  const db = drizzle(process.env.DATABASE_URL!)

  const worksheetData = {
    language,
    questions: [],
    topics: [],
    text: full_text,
    name: "Youtube Video",
    userId,
    visibility: true,
    chunkStartId: [],
    chunkEndId: [],
    textArray: []
  }

  const result = await db.insert(worksheetsTable).values({
    ...worksheetData
  }).returning({worksheetId: worksheetsTable.id})

  console.log("Worksheet created")

  redirect("/library/" + result[0].worksheetId)

}