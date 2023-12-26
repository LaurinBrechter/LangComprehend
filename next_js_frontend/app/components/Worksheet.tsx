import React from 'react'
import { FC } from 'react'
import Link from 'next/link'

export interface WorksheetProps {
  id: number
  text: string
  worksheet_name: string
}


const Worksheet: FC<WorksheetProps> = (props): JSX.Element => {
  return (
    <div className='bg-slate-200 border-solid border-2 border-gray-600 p-2 rounded-lg'>
      <h1 className='card-title'>{props.worksheet_name}</h1>
      <div>{props.text}</div>
      <Link href={`/library/${props.id}`}>Explore</Link>
    </div>
  )
}

export default Worksheet