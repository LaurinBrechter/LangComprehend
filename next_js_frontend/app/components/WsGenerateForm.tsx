"use client"
import { WorksheetProps } from './Worksheet'

import React from 'react'
import { FC } from 'react'
import getWorksheet from '../actions/getWorksheetData'

const WsGenerateForm: FC<WorksheetProps> = (props): JSX.Element => {
    return (
        <div>
            <form className='bg-gray-300 p-3 flex flex-col items-center gap-4 h-[10%] w-full' action={getWorksheet}>
                <button className='btn'>Generate</button>
                <input id="worksheet-name" type="text" placeholder="Name your worksheet" className="input" name="worksheet-name" />
                <input type="number" placeholder="Number of Questions" className="input w-full max-w-xs" id='num-questions' name="num-questions" />
                <input type="hidden" name="id" value={props.id} />
                <input type="hidden" name="text" value={props.text} />
                <input type="hidden" name="language" value={"fr"} />
            </form>
        </div>
    )
}

export default WsGenerateForm