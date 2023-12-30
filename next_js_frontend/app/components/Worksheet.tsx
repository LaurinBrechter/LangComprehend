import React from 'react'
import { FC } from 'react'
import Link from 'next/link'

export interface WorksheetProps {
  id: number
  text: string
  worksheet_name: string | null
  language: string
  topics: string[]
}


const Worksheet: FC<WorksheetProps> = (props): JSX.Element => {
  return (
    <div className='bg-slate-200 p-4 rounded-lg h-[300px]' key={props.id}>
      <Link href={`/library/${props.id}`} className='text-3xl'>{props.worksheet_name}</Link>
      <div className='flex flex-wrap gap-2'>
        {
          props.topics.map((topic: string) => <button className='btn btn-sm overflow-hidden break-keep w-[160px]'>{topic}</button>)
        }
      </div>
      <div>{props.text}</div>
    </div>
  )
}

export default Worksheet