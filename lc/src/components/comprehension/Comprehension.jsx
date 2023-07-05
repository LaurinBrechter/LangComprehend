import "./comprehension.scss"
import { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
// const { MongoClient } = require("mongodb");
import AccordionSummary from '@mui/material/AccordionSummary';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

export default function Comprehension({ }) {


  function getVideoData(url = 'http://localhost:8000/downloadVideo', params = {}) {
    console.log("getData")
    let url_w_query = url + '?' + (new URLSearchParams(params)).toString();

    fetch(url_w_query, {
      method: 'GET'
    })
      .then((resp) => resp.json())
      .catch(() => {
        setText("Error")
      })
      .then(function (data) {
        let text = data.video_text
        setText(text)
      })
  }

  function generateVocab(url = 'http://localhost:8000/generateVocab', params = {}, text) {
    console.log("generateVoc")
    let url_w_query = url + '?' + (new URLSearchParams(params)).toString();

    fetch(url_w_query, {
      method: 'POST',
      body: JSON.stringify({ text: text }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((resp) => resp.json())
      .catch(() => {
        setVocs("Error")
      })
      .then(function (data) {
        setVocs(data.vocs_list)
      })
  }

  async function generateWorksheet(url = 'http://localhost:8000/generateWorksheet', params = {}) {
    let url_w_query = url + '?' + (new URLSearchParams(params)).toString();
    await fetch(url_w_query, {
      method: 'POST',
      body: JSON.stringify({ text: text }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((resp) => resp.json())
      .catch(() => {
        setText("Error")
      })
      .then(function (data) {
        setTopics(data["topics"])
        setQuestions(data["questions"])
      })
    // })

  }



  const [vocs, setVocs] = useState(["chien", "maison"])
  const [text, setText] = useState('Comprehension')
  const [topics, setTopics] = useState([])
  const [questions, setQuestions] = useState(["Q1", "Q2"])
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    generateVocab(
      'http://localhost:8000/generateVocab',
      {
        "language": "fr",
      },
      text
    )
  }, [text])

  const getSourceHandler = (e) => {
    e.preventDefault(); // prevent page reload
    // 
    getVideoData(
      'http://localhost:8000/downloadVideo',
      {
        "language": e.target[1].value,
        "url": e.target[0].value,
      }
    )

    // generateVocab(
    //   'http://localhost:8000/generateVocab',
    //   {
    //     "language": e.target[1].value,
    //   },
    //   text
    // )
  }


  const generateWorksheetHandler = (e) => {
    e.preventDefault(); // prevent page reload

    console.log(e)

    generateWorksheet(
      'http://localhost:8000/generateWorksheet',
      {
        "n_questions": e.target[0].value,
        "language": "fr"
      }
    )
  }

  // const topics = ["Topic1", "Topic2", "Topic3", "Topic4", "Topic5"]
  const topicList = topics.map((topic) => (
    <div className="topic">{topic}</div>
  ));

  const vocsList = vocs.map((voc) => (
    <div className="voc">{voc}</div>
  ));

  function SimpleAccordion(add_title, acc_text = "") {
    return (
      <Accordion className="accordion">
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="accordion"
        >
          <Typography className="accordion">{add_title}</Typography>
        </AccordionSummary>
        <AccordionDetails className="accordion">
          <Typography>
            {acc_text}
            <button>Check Answer</button>
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
  }

  return (
    <div id="comprehension" className="comprehension">
      {/* <button onClick={myevent}>Click for event</button> */}
      <form onSubmit={getSourceHandler} className="normal-container form text-retrieval-form">
        <div>
          <div>URL</div>
          <input className="form-input" type="text" name="name" id="name" placeholder="Your URL" defaultValue="https://www.youtube.com/watch?v=rxOQtLbaeuw&ab_channel=LeMonde"></input>
        </div>
        <div>
          <div>Language</div>
          <input className="form-input" type="text" name="lang" id="lang" placeholder="Language of the text" defaultValue="fr"></input>
        </div>
        {/* <label>
          Language:
          <input type="text" name="lang" id="lang" placeholder="Language of the text" defaultValue="fr"></input>
        </label> */}
        <button type="submit">Get Text</button>
      </form>
      <div className="text-voc-container">
        {/* <div className="text-output">{text}</div> */}
        <div className="normal-container text-container">
          <textarea name="text" id="text" className="output-area text-output" value={text} rows="5"></textarea>
        </div>
        <div className="normal-container vocab-container">
          <div className="vocab-list">
            <div>
              {vocsList}
            </div>
          </div>
        </div>
      </div>
      <form className="form question-form" onSubmit={generateWorksheetHandler}>
        {/* <label>
          API Key:
          <input type="text" name="key" id="key" placeholder="Your API Key"></input>
        </label>
        <label>
          N Tokens
          <input type="text" name="ntokens" id="ntokens" placeholder="Number of Tokens"></input>
        </label>
        <label>
          Cost ($)
          <input type="text" name="cost" id="cost" placeholder="Cost"></input>
        </label> */}
        <label>
          Number of Questions:
          <input type="text" name="num" id="nq" placeholder="Number of Questions"></input>
        </label>
        <button type="submit">Submit</button>
      </form>
      <h3 className="worksheet">Worksheet</h3>
      <div className="normal-container worksheet-container">
        <div><h4>Topics</h4></div>
        <div className="topic-list">
          {topicList}
        </div>
        <h4>Short Comprehension Questions</h4>
        <div className="question-accordion-container">
          {questions.map(SimpleAccordion)}
        </div>
        <h4>Long Free Form Topic Questions</h4>
        <p>Click on a topic to generate a Free Form question.</p>
      </div>
    </div>
  )
}