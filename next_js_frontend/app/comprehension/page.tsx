import React from 'react'
import { getVideoData } from '../actions/getVideoData';

const Comprehension = () => {


  return (
    <div className='p-10 h-[90%]'>
      <div className='w-full h-full flex justify-center items-center'>
        <form className='bg-gray-300 p-3 flex items-center gap-4 h-[10%]' action={getVideoData}>
          <button className='btn'>Generate</button>
          <select id="text-source" className="select max-w-xs text-black" defaultValue={"yt"} name='text-source'>
            <option value={"pdf"}>PDF</option>
            <option value={"yt"}>Youtube</option>
          </select>
          <input id="video-url" type="text" placeholder="Youtube Link" className="input" name="youtube-link" required />
          <select id="target-language" className="select max-w-xs text-black" defaultValue={"en"} name='target-language'>
            <option value={"fr"}>Fench</option>
            <option value={"en"}>English</option>
            <option value={"de"}>German</option>
            <option value={"es"}>Spanish</option>
          </select>
        </form>
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