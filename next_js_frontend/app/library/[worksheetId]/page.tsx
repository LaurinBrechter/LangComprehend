import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"

export default async function WorksheetDetails( {params} : {params: {worksheetId: number}}) {
    
    // const res = await fetch("http://localhost:8000/worksheet/getWorksheet?worksheet_name=my_ws")
    // const data = await res.json()
    const prisma = new PrismaClient()
    const ws_id = Number(params.worksheetId)

    if (isNaN(ws_id)) {{
        notFound()
    }}

    const result = await prisma.worksheets.findUnique({
        where: {
            id: Number(params.worksheetId)
        }
    })

    if (!result) {
        notFound()
    }

    const text = result.text?.toString("utf8")

    return (
        <div className="h-[90%] bg-slate-300 px-24 py-16">
            <h1>Worksheet Details  {result.name}</h1>
            <div className="flex gap-4 mt-4">
                {result.topics.map((topic: string) => {return (<div className="btn">{topic}</div>)})}
            </div>
            <div className="w-full bg-slate-700 mt-4 h-[500px] overflow-scroll">{text}</div>
            <div className="carousel w-full h-[20%]">
                {
                    result.questions.map((question:string, idx:number) => { return (
                        <div id={"item" + (idx+1)} className="carousel-item w-full flex-col bg-slate-400">
                            <div>
                                {question}
                            </div>
                            <div>
                                <textarea className="textarea textarea-bordered w-full" placeholder="Bio"></textarea>
                            </div>
                            <div className="btn">Submit</div>
                        </div>)
                    })
                }
            </div> 
            <div className="flex justify-center w-full py-2 gap-2">
                {
                    result.questions.map((question:string, idx:number) => { return (
                        <a href={"#item"+(idx+1)} className="btn btn-xs">{"Question "+(idx+1)}</a>)
                    })
                }
            </div>
        </div>
        
    )
}