import "./comprehension.scss"
import { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

export default function Comprehension({ }) {


  const language_options = [
    <MenuItem value="fr">French</MenuItem>,
    <MenuItem value="pt">Portuguese (Portugal)</MenuItem>,
    <MenuItem value="pt">Portuguese (Brazil)</MenuItem>,
    <MenuItem value="en">English</MenuItem>,
    <MenuItem value="es">Spanish</MenuItem>,
    <MenuItem value="ge">German</MenuItem>
  ]

  function getVideoData(url = 'http://localhost:8000/worksheet/downloadVideo', params = {}) {
    console.log("getData")
    let url_w_query = url + '?' + (new URLSearchParams(params)).toString();

    fetch(url_w_query, {
      method: 'GET'
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        } else {
          return response.json();
        }
      })
      .catch(() => {
        setText("The video you supplied and the language you set do not match. Please make sure that the video has subtitles in the language you set.")
      })
      .then(function (data) {
        setText(data.video_text)
      })
  }

  function generateVocab(url = 'http://localhost:8000/worksheet/vocabFromText', params = {}, text) {
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
        console.log(data.vocs_list)
        setVocs(data.vocs_list)
      })
  }

  async function generateWorksheet(url = 'http://localhost:8000/worksheet/generateWorksheet', params = {}) {
    let url_w_query = url + '?' + (new URLSearchParams(params)).toString();

    const text = document.getElementById("text").value
    console.log(url_w_query)

    console.log(text)
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
  }



  const [vocsTest, setVocs] = useState(["chien", "maison"])
  const [text, setText] = useState('Comprehension')
  const [topics, setTopics] = useState([])
  const [questions, setQuestions] = useState(["Q1", "Q2"])
  const [answers, setAnswers] = useState([])
  const [lang, setLang] = useState("fr")

  // useEffect(() => {
  //   if (text != "Error") {
  //     generateVocab(
  //       'http://localhost:8000/worksheet/vocabFromText',
  //       {
  //         "language": document.getElementById("select-lang").value,
  //       },
  //       text
  //     )
  //   }

  // }, [text])

  const getSourceHandler = (e) => {
    e.preventDefault(); // prevent page reload

    const video_url = document.getElementById("video-url").value
    // const language = document.getElementById("select-lang").value

    document.getElementById("text").value = "Loading..."

    console.log(lang)
    // 
    getVideoData(
      'http://localhost:8000/worksheet/downloadVideo',
      {
        "language": lang,
        "url": video_url,
      })

    document.getElementById("text").value = text


  }


  const generateWorksheetHandler = (e) => {
    e.preventDefault(); // prevent page reload

    console.log(e)

    generateWorksheet(
      'http://localhost:8000/worksheet/generateWorksheet',
      {
        "num_questions": 2,
        "language": lang,
        "name": "test"
      }
    )
  }

  const onClickTopic = (e) => {
    e.preventDefault();
    console.log(e.target.id)
  }


  const topicList = topics.map((topic, idx) => (
    <div className="topic" id={"topicid-" + idx} onClick={onClickTopic}>{topic}</div>
  ));

  console.log(vocsTest)

  const vocsList = vocsTest.map((voc) => (
    <div className="voc" id={"vocid-" + voc}>{voc}</div>
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

      <div className="text-voc-container">
        <div className="normal-container text-container">
          <form onSubmit={getSourceHandler} className="normal-container form text-retrieval-form">
            <Button variant="contained" type="submit">Load Text</Button>
            <TextField id="video-url" label="Url" variant="outlined" defaultValue={"https://www.youtube.com/watch?v=rxOQtLbaeuw&ab_channel=LeMonde"} />
            <TextField
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              select // tell TextField to render select
              label="Language"
            >
              {language_options}
            </TextField>
          </form>
          <textarea name="text" id="text" className="output-area text-output" rows="5"></textarea>
          {/* <input name="text" id="text" className="output-area text-output"></input> */}
        </div>
        <div className="normal-container worksheet-container">
          <form className="form question-form" onSubmit={generateWorksheetHandler} fullWidth>
            <TextField id="n-questions" label="N questions" variant="outlined" defaultValue={3} />
            <Button variant="contained" type="submit">Generate Worksheet</Button>
          </form>
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
    </div>
  )
}