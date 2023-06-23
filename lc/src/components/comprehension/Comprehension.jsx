import "./comprehension.css"
import { useState } from "react";
// const { MongoClient } = require("mongodb");

export default function Comprehension({menuOpen, setMenuOpen}) {


  async function getVideoData(url = 'http://localhost:8000/downloadVideo', params = {}) {
    let url_w_query = url + '?' + ( new URLSearchParams( params ) ).toString();

    await fetch(url_w_query, {
      method: 'GET'
    })
      .then((resp) => resp.json())
      .catch(() => {
        setText("Error")
      })
      .then(function(data) {
        let text = data.video_text
        setText(text)
      })
  }

  async function generateVocab(url = 'http://localhost:8000/downloadVideo', params={}, text) {
    let url_w_query = url + '?' + ( new URLSearchParams( params ) ).toString();

    await fetch(url_w_query, {
      method: 'POST',
      body: JSON.stringify({text:text}),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((resp) => resp.json())
      .catch(() => {
        setVocs("Error")
      })
      .then(function(data) {
        let vocs = data.vocs_list
        const listItems = vocs.map((voc) => (
          <li>{voc}</li>
        ));

        setVocs(listItems)
      })
  }

  
  // const [message, setMessage] = useState(false)
  // const [ntokens, setNtokens] = useState(0)

  const [vocs, setVocs] = useState(["chien", "maison"])
  const [text, setText] = useState('Comprehension')

  const handleSubmit = (e) =>{
    e.preventDefault(); // prevent page reload
    
    // var x = {
    //   "url": e.target[0].value,
    //   "lang": e.target[1].value,
    //   "key": e.target[2].value,
    //   "num": e.target[3].value
    // }
    // console.log("Request params: ", x)

    // console.log()
    // 
    const txt = getVideoData(
      'http://localhost:8000/downloadVideo',
      {
        "language": e.target[1].value,
        "url": e.target[0].value,
      }
    )
    
    const vocs = generateVocab(
      'http://localhost:8000/generateVocab',
      {
        "language": e.target[1].value,
      },
      text
    )
  }
  
  return (
    <div id="comprehension" className="comprehension">
      {/* <button onClick={myevent}>Click for event</button> */}
      <form onSubmit={handleSubmit} className="form text-retrieval-form">
        {/* <label className="form-label"> */}
          {/* URL: */}
        <input className="form-input" type="text" name="name" id="name" placeholder="Your URL" defaultValue="https://www.youtube.com/watch?v=rxOQtLbaeuw&ab_channel=LeMonde"></input>
        {/* </label> */}
        <label>
          Language:
          <input type="text" name="lang" id="lang" placeholder="Language of the text" defaultValue="fr"></input>
        </label>
        <label>
          API Key:
          <input type="text" name="key" id="key" placeholder="Your API Key"></input>
        </label>
        <label>
          Number of Questions:
          <input type="text" name="num" id="nq" placeholder="Number of Questions"></input>
        </label>
        <button type="submit">Submit</button>  
      </form>

      <div className="text-voc-container">
        {/* <div className="text-output">{text}</div> */}
        <div className="text-container">
          <h3>Source Text</h3>
          <textarea name="text" id="text" className="output-area text-output" value={text} rows="5"></textarea>
        </div>
        <div className="vocab-container">
          <h3>Vocabulary</h3>
          <div className="output-area vocabs">
            <ul>
              {vocs}
            </ul>
          </div>
        </div>
      </div>
      <form className="form question-form">
        <label>
          N Tokens
          <input type="text" name="ntokens" id="ntokens" placeholder="Number of Tokens"></input>
        </label>
        <label>
          Cost ($)
          <input type="text" name="cost" id="cost" placeholder="Cost"></input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}