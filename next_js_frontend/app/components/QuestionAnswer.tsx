"use client";
import React, { FC } from 'react'
import { useState } from 'react';

export interface QAProps {
  questions: string[]
  answers: string[]
}

const QuestionAnswer: FC<QAProps> = (props): JSX.Element => {
  const [questionActive, setQuestionActive] = useState(0)

  console.log(props.questions.at(questionActive))

  return (
    <div>
      <div>
        <div className="carousel w-full h-[20%]">
          {
            props.questions.map((question: string, idx: number) => {
              return (
                <div id={"item" + (idx + 1)} className="carousel-item w-full flex-col bg-slate-400">
                  <div>
                    {question}
                  </div>
                  <form>
                    <textarea className="textarea textarea-bordered w-full" placeholder="Your Answer"></textarea>
                    <div className="btn">Submit</div>
                  </form>
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