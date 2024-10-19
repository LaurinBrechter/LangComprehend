import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { getVideoData } from '@/actions/getVideoData'
import { drizzle } from 'drizzle-orm/node-postgres'
import { usersTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

const page = async () => {

    const session = await getServerSession(authOptions)
    const db = drizzle(process.env.DATABASE_URL!)


    if (!session) {
        redirect("/api/auth/signin")
    }

    console.log(session.user)

    const users = await db.select().from(usersTable).where(eq(usersTable.email, session.user.email))

    if (users.length === 0) {
        redirect("/api/auth/signin")
    }

    const withUserId = getVideoData.bind(null, users[0].id)

    return (
        <div className='p-10 h-[90%]'>
            <div className='w-full h-full flex justify-center items-center'>
                <form className='bg-gray-300 p-3 flex items-center gap-4 h-[10%]' action={withUserId}>
                    <button className='btn'>Generate</button>
                    <select id="text-source" className="select max-w-xs text-black" defaultValue={"yt"} name='text-source'>
                        <option value={"pdf"}>PDF</option>
                        <option value={"yt"}>Youtube</option>
                    </select>
                    <input id="video-url" type="text" placeholder="Youtube Link" className="input" name="youtube-link" required />
                    <div className="tooltip" data-tip="Here you can choose your target language (i.e. which you wnat to study) But your text can be in any langugage, we will translate it for you ;).">
                        <select id="target-language" className="select max-w-xs text-black" defaultValue={"en"} name='target-language'>
                            <option value={"fr"}>Fench</option>
                            <option value={"en"}>English</option>
                            <option value={"de"}>German</option>
                            <option value={"es"}>Spanish</option>
                        </select>
                    </div>
                </form>
            </div>
            <div>
            </div>
        </div>
    )
}

export default page