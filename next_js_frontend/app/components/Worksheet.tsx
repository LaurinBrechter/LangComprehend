import React from 'react'
import { FC } from 'react'
import Link from 'next/link'

export interface WorksheetProps {
    // questions: string[]
    // answers: string[]
    // topics: string[]
    id: number
    worksheet_name: string
    text: string
}


const Worksheet: FC<WorksheetProps> = (props): JSX.Element => {
  return (
    <div className='bg-slate-200 border-solid border-2 border-gray-600 p-2'>
        <h1 className='card-title'>Worksheet</h1>
        <div>{props.text}</div>
        <Link href={`/library/${props.id}`}>Explore</Link>
    </div>
  )
}

export default Worksheet