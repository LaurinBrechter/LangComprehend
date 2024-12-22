"use client";
import React, { FC, useActionState, type JSX } from 'react';
import { useState } from 'react';
import correctAnswer from '../actions/correctAnswer';

export interface QAProps {
  questions: string[]
  question_context: string[]
  chunkStartIdx: number[]
  chunkEndIdx: number[]
}


const giveHint = (event) => {

  event.preventDefault()
  const start = event.target.elements.chunkStartIdx.value
  const end = event.target.elements.chunkEndIdx.value

  for (let i = start; i < end; i++) {
    document.querySelector("#chunk-" + i)?.classList.add("bg-slate-400")
  }

}

const QuestionAnswer: FC<QAProps> = (props): JSX.Element => {
  const [questionActive, setQuestionActive] = useState(0)

  const [state, formAction] = useActionState(correctAnswer, null)

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
                    <form action={formAction} className='flex mt-3 gap-2'>
                      <input type='hidden' name='question_context' value={props.question_context.at(questionActive)} />
                      <input type='hidden' name='question' value={props.questions.at(questionActive)} />
                      <textarea className="textarea textarea-bordered w-full" placeholder="Your Answer" name='user-msg'></textarea>
                      <button type='submit' className="btn">Submit</button>
                    </form>
                    <form onSubmit={giveHint}>
                      <button type='submit' className='btn'>Hint</button>
                      <input type='hidden' name='chunkStartIdx' value={props.chunkStartIdx.at(questionActive)} />
                      <input type='hidden' name='chunkEndIdx' value={props.chunkEndIdx.at(questionActive)} />
                    </form>
                  </div>
                </div>)
            })
          }
        </div>
        <div className="flex justify-center w-full py-2 gap-2 items-center">
          {
            props.questions.map((question: string, idx: number) => {
              return (
                <a
                  href={"#item" + (idx + 1)}
                  className={"btn" + (idx === questionActive ? "" : " btn-sm")}
                  onClick={() => setQuestionActive(idx)}
                  key={"question" + (idx + 1)}>{"Question " + (idx + 1)}</a>)
            })
          }
        </div>
        {state ?
          <div className='flex flex-col'>
            <div className='bg-slate-400 p-4'>
              <h2 className='text-2xl'>Grammar:</h2>
              {state.response__grammar}
            </div>
            <div className='bg-slate-400 p-4'>
              <h2 className='text-2xl'>Content:</h2>
              {state.response__content}
            </div>
          </div> : ""
        }
      </div>
    </div>
  )
}

export default QuestionAnswer