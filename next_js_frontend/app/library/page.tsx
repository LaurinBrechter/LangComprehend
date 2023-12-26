import React from 'react'
import Worksheet from '../components/Worksheet'
import { PrismaClient } from '@prisma/client'

const Library = async () => {

    const prisma = new PrismaClient()

    const db_res = await prisma.worksheets.findMany({
        where: {
            NOT: {
                name: null
            }
        }
    })

    return (
        <div>
            <div className='grid grid-cols-4 gap-4 m-4'>
                {db_res.map(item => <Worksheet text={item.text.toString("utf8").slice(0, 100) + "..."} worksheet_name={item.name} id={item.id} />)}
            </div>
        </div>
    )
}

export default Library