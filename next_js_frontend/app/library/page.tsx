import React from 'react'
import Worksheet from '../components/Worksheet'
import { PrismaClient } from '@prisma/client'
import LibrarySearch from '../components/LibrarySearch'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const Library = async ({ searchParams }: { searchParams: { language: string, page: Number, q: string } }) => {

    const prisma = new PrismaClient()
    const session = await getServerSession(authOptions)

    if (session) {
        console.log(session.user)
    } else {
        redirect("/api/auth/signin")
    }

    const uid = prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    console.log(uid)

    const db_res = await prisma.worksheets.findMany({
        where: {
            NOT: {
                name: null
            },
            AND: {
                language: searchParams["language"]
            }
        }
    })

    return (
        <div className='m-4'>
            <LibrarySearch />
            <div className='grid grid-cols-4 gap-4 p-4 bg-slate-50'>
                {
                    db_res.map(item => <Worksheet
                        text={item.text?.toString("utf8").slice(0, 100) + "..."}
                        worksheet_name={item.name}
                        id={item.id}
                        language={item.language}
                        topics={item.topics}
                    />)}
            </div>
        </div>
    )
}

export default Library