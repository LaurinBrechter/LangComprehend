import React from 'react'
import Worksheet from '../components/Worksheet'
import { WorksheetProps } from '../components/Worksheet'

const Library = async () => {
  
    const res = await fetch('http://localhost:8000/worksheet/getWorksheet/?worksheet_name=test')
    const data: WorksheetProps = await res.json()

    return (
    <div>
        <div className='grid grid-cols-4 gap-4 m-4'>
            {[1,2,3, 4].map(item => <Worksheet text={data.text} worksheet_name={data.worksheet_name} id={item}/>)}
        </div>
    </div>
  )
}

export default Library