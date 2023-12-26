"use client";
import React, { FC } from 'react'
import { useState } from 'react';

export interface QAProps {
  questions: string[]
  answers: string[]
}

function handleSubmit(event: any) {
  event.preventDefault();
  console.log(event.target.elements[0].value)
}


const QuestionAnswer: FC<QAProps> = (props): JSX.Element => {
  const [questionActive, setQuestionActive] = useState(0)

  return (
    <div>
      <div>
        <div className="carousel w-full h-[20%]">
          {
            props.questions.map((question: string, idx: number) => {
              return (
                <div id={"item" + (idx + 1)} key={"item" + (idx + 1)} className="carousel-item w-full flex-col bg-slate-400 rounded-lg">
                  <div className='p-4'>
                    <div>
                      {props.questions.at(questionActive)}
                    </div>
                    <form onSubmit={handleSubmit} className='flex mt-3 gap-2'>
                      <textarea className="textarea textarea-bordered w-full" placeholder="Your Answer"></textarea>
                      <button type='submit' className="btn">Submit</button>
                    </form>
                  </div>
                </div>)
            })
          }
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
          {
            props.questions.map((question: string, idx: number) => {
              return (
                <a href={"#item" + (idx + 1)} className="btn btn-xs">{"Question " + (idx + 1)}</a>)
            })
          }
        </div>
      </div>
    </div>
  )
}

export default QuestionAnswer