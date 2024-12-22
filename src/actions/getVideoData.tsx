"use server";

import { resourceTable, worksheetsTable } from '@/db/schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { redirect } from 'next/navigation';
import { getSubtitles } from 'youtube-captions-scraper';
import { usersTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { ImportYoutubeFormSchema } from '@/components/forms/ImportYoutubeVideoForm';
import { z } from 'zod';

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



export const getVideoData = async (data: z.infer<typeof ImportYoutubeFormSchema>, email: string) => {
  "use server"

  const language = data.targetLanguage
  const url = data.youtubeLink

  const yt_id = YouTubeGetID(url)

  console.log("Getting captions")

  const captions = await getSubtitles({
    videoID: yt_id, // youtube video id
    lang: language // default: `en`
  })

  let full_text = ""

  for (let i = 0; i < captions.length; i++) {
    full_text += captions[i].text + "---"
  }

  const db = drizzle(process.env.DATABASE_URL!)

  const users = await db.select().from(usersTable).where(eq(usersTable.email, email))


  const result = await db.insert(resourceTable).values({
    name: "Youtube Video",
    url: url,
    userId: users[0].id,
    text: full_text,
  }).returning({resourceId: resourceTable.id})

  console.log("Resource created")

  // redirect("/library/" + result[0].resourceId)

}