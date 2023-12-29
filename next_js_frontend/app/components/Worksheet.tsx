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
    <div className='bg-slate-200 border-solid border-2 border-gray-600 p-2 rounded-lg' key={props.id}>
      <Link href={`/library/${props.id}`} className='text-3xl'>{props.worksheet_name}</Link>
      <div>{props.text}</div>
      <div>
        {
          props.topics.map((topic: string) => <button className='btn btn-sm'>{topic}</button>)
        }
      </div>
    </div>
  )
}

export default Worksheet