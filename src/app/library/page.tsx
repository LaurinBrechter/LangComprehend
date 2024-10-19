import React, { Suspense } from 'react'
import Worksheet from '@/components/Worksheet'
import LibrarySearch from '@/components/LibrarySearch'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { worksheetsTable } from '@/db/schema'
import { drizzle } from 'drizzle-orm/node-postgres'

const Library = async ({ searchParams }: { searchParams: { language: string, page: Number, q: string } }) => {

    const session = await getServerSession(authOptions)
    const db = drizzle(process.env.DATABASE_URL!)

    if (session) {
        console.log(session.user)
    } else {
        redirect("/api/auth/signin")
    }

    const worksheets = await db.select().from(worksheetsTable)

    return (
        <div className='p-4 h-[90%] bg-slate-50 flex flex-col'>
            <LibrarySearch />
            <Suspense fallback={<div>Loading...</div>}>
                <div className='grid grid-cols-4 gap-7 p-6 bg-slate-50 grow '>
                    {
                        worksheets.map(worksheet => <Worksheet
                            text={worksheet.text?.toString("utf8").slice(0, 100) + "..."}
                            worksheet_name={worksheet.name}
                            id={worksheet.id}
                            language={worksheet.language}
                            topics={worksheet.topics}
                        />)}
                </div>
            </Suspense>
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