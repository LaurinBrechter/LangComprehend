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
        <div className='p-4 h-[90%] bg-slate-50 flex flex-col'>
            <LibrarySearch />
            <div className='grid grid-cols-4 gap-7 p-6 bg-slate-50 grow '>
                {
                    db_res.map(item => <Worksheet
                        text={item.text?.toString("utf8").slice(0, 100) + "..."}
                        worksheet_name={item.name}
                        id={item.id}
                        language={item.language}
                        topics={item.topics}
                    />)}
            </div>
            <div className='flex items-center justify-center'>
                <div className="join">
                    <button className="join-item btn">Previous</button>
                    <button className="join-item btn">1</button>
                    <button className="join-item btn btn-active">2</button>
                    <button className="join-item btn">3</button>
                    <button className="join-item btn">4</button>
                    <button className="join-item btn">Next</button>
                </div>
            </div>
        </div>
    )
}

export default Library