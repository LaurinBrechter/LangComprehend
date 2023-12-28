"use client";
import React, { FC } from 'react'
import { useState } from 'react';
import { useFormState } from 'react-dom';
import correctAnswer from '../actions/correctAnswer';

export interface QAProps {
  questions: string[]
}

// async function handleSubmit(event: any) {
//   event.preventDefault();

//   const msg = console.log(event.target[0].value)

//   const res = await fetch('/api/correction', {
//     method: 'POST',
//     body: JSON.stringify({ "msg": msg }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })

//   const data = await res.json()

//   console.log(data)
// }


const QuestionAnswer: FC<QAProps> = (props): JSX.Element => {
  const [questionActive, setQuestionActive] = useState(0)

  const [state, formAction] = useFormState(correctAnswer, null)

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
                      <textarea className="textarea textarea-bordered w-full" placeholder="Your Answer" name='user-msg'></textarea>
                      <button type='submit' className="btn">Submit</button>
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
        <div>
          {state?.response ? state.response : ""}
        </div>
      </div>
    </div>
  )
}

export default QuestionAnswer