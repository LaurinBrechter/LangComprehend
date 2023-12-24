"use client";
import React from 'react'
import { useFormState } from 'react-dom';
import { getVideoData } from '../components/getVideoData';
import { getWorksheetData } from '../components/getWorksheetData';
import Link from 'next/link';

const Comprehension = () => {

  const [text, textAction] = useFormState(getVideoData, null)
  const [worksheet, worksheetAction] = useFormState(getWorksheetData, null)

  return (
    <div className='p-10 h-[90%]'>
      <div className='w-full bg-slate-500 h-[80%]'>
        <form className='bg-gray-300 p-3 flex items-center gap-4 h-[10%]' action={textAction}>
          <button className='btn'>Generate</button>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">Source</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Youtube</a></li>
              <li><a>Pdf</a></li>
            </ul>
          </div>
          <input id="video-url" type="text" placeholder="Youtube Link" className="input" name="youtube-link"/>
        </form>
        <div className='bg-gray-100 text-lg h-[90%] overflow-scroll p-5' id="text">
          {text}
        </div>
      </div>
      <div className='w-3/5'>
        {text && <form className='bg-gray-300 p-3 flex items-center gap-4 h-[10%]' action={worksheetAction}>
          <button className='btn'>Generate</button>
          <input id="worksheet-name" type="text" placeholder="Name your worksheet" className="input" name="worksheet-name"/>
          <input type="number" placeholder="Number of Questions" className="input w-full max-w-xs" id='num-questions'/>
        </form>}
        <div>
          {worksheet && <Link href={`/library/${worksheet}`}>Your Worksheet</Link>}
        </div>  
      </div>
      {/* <Document file="https://arxiv.org/pdf/1209.1727.pdf">
        <Page
            key={`page_1`}
            pageNumber={1}/>
      </Document> */}
      <div>
      {/* <Document file={"https://arxiv.org/pdf/1209.1727.pdf"}>
        <Page pageNumber={1} />
      </Document> */}
    </div>
    </div>
  )
}

export default Comprehension