import "./vocab.css"
import React from "react"
import { useState } from "react"

export default function Vocab() {

  function getVocabs(params = {}) {
    let url = 'http://localhost:8000/vocabs/getAll'
    let url_w_query = url + '?' + (new URLSearchParams(params)).toString();

    fetch(url_w_query)
      .then(res => res.json())
      .then(data => {
        setVocabs(data["vocabs"])
      })
  }

  const [example, setExample] = useState("Press Start to begin practicing")
  const [vocabs, setVocabs] = useState(getVocabs({ "u_id": 1 }))

  function handleStart() {
    const voc_copy = [...vocabs] // copy the array
    const vocs_shuffled = voc_copy.sort(() => 0.5 - Math.random()); // shuffle the array
    let selected = vocs_shuffled.slice(0, 2); // get sub-array of first n elements AFTER shuffle
    setExample(selected)
  }

  return (
    <div className="vocab-page">
      <h3>Your Progress</h3>
      <div className="progress-container normal-container">
        <div>{vocabs}</div>
        <div className="fact">
          <div className="fact-title">N Vocabs</div>
          <div className="fact-value"><h2>1000</h2></div>
        </div>

      </div>
      <h3>Vocab Trainer<button onClick={handleStart} className="vocab-trainer-button">Start</button></h3>
      <div className="normal-container vocab-trainer-container">
        {/* <button onClick={handleStart} className="vocab-trainer-button">Start</button> */}
        <div>Original</div>
        <div>{example}</div>
        <div>Your Answer:</div>
        <input className="vocab-trainer-input" type="text" name="name" id="name" placeholder="Your Answer"></input>
        <button className="vocab-trainer-button">Check</button>
      </div>
    </div >
  )
}