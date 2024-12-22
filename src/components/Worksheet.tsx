import React, { type JSX } from 'react';
import { FC } from 'react'
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'

export interface WorksheetProps {
  id: number
  text: string
  worksheet_name: string | null
  language: string
  topics: string[]
}


const Worksheet: FC<WorksheetProps> = (props): JSX.Element => {
  return (
    <Card key={props.id}>
      <CardHeader>
      <CardTitle>
        <Link href={`/library/${props.id}`} className='text-3xl'>{props.worksheet_name}</Link>
      </CardTitle>
      <CardDescription className='flex flex-wrap gap-2'>
        {
          props.topics.map((topic: string) => <button className='btn btn-sm overflow-hidden break-keep w-[160px]'>{topic}</button>)
        }
      </CardDescription>
      </CardHeader>
      <div>{props.text}</div>
    </Card>
  )
}

export default Worksheet