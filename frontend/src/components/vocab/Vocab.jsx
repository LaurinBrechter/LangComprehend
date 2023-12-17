import "./vocab.scss"
import React from "react"
import { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Vocab() {




  async function getVocabs(params = {}) {
    let url = 'http://localhost:8000/vocabs/getAll'
    let url_w_query = url + '?' + (new URLSearchParams(params)).toString();

    await fetch(url_w_query)
      .then((resp) => resp.json())
      .then(function (data) {
        setVocs(data.vocabs)
      })
  }

  async function generateExample(vocabs, params = {}) {
    let url = 'http://localhost:8000/vocabs/generateExample'
    let url_w_query = url + '?' + (new URLSearchParams(params)).toString();

    let body = JSON.stringify({ vocs_list: vocabs })
    console.log(body)

    await fetch(url_w_query, {
      method: 'POST',
      body: body,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((resp) => resp.json())
      .then(function (data) {
        setTarget(data.example)
        setTranslation(data.translation)
      })
  }

  const [target_sentence, setTarget] = useState("Press Start to begin practicing")
  const [translated_sentence, setTranslation] = useState("Press Start to begin practicing")
  const [vocabs, setVocs] = useState([])
  const [lang, setLang] = useState("")

  useEffect(() => {
    console.log("useEffect")
    getVocabs({ "u_id": 1, "language": lang })
  }, [lang])


  function handleStart() {
    const voc_copy = [...vocabs] // copy the array
    const vocs_shuffled = voc_copy.sort(() => 0.5 - Math.random()); // shuffle the array
    let selected = vocs_shuffled.slice(0, 2); // get sub-array of first n elements AFTER shuffle
    generateExample(selected, { "base_language": lang, "target_language": document.getElementById("target-language").value })

    var x = document.getElementById("translation");

    x.style.display = "none";
    // if (x.style.display === "block") {
    //   x.style.display = "none";
    // }
  }

  const vocsList = vocabs.map((voc) => (
    <div className="vocab">{voc}</div>
  ))

  const language_options = [
    <option value="fr">French</option>,
    <option value="pt-PT">Portuguese (Portugal)</option>,
    <option value="pt-BR">Portuguese (Brazil)</option>,
    <option value="en">English</option>,
    <option value="es">Spanish</option>,
    <option value="ge">German</option>
  ]

  const handleLangChange = (event) => {
    setLang(event.target.value);
  }

  function showTranslation() {
    var x = document.getElementById("translation");
    if (x.style.display === "none") {
      x.style.display = "block";
    }
  }




  return (
    <div className="vocab-page">
      <h3>Your Progress</h3>
      <select className="lang-select" onChange={handleLangChange}>
        {language_options}
      </select>
      <div className="progress-container normal-container">
        {/* <div>{vocabs}</div> */}

        <div className="fact">
          <div className="fact-title">N Vocabs</div>
          <div className="fact-value"><h2>{vocabs.length}</h2></div>
        </div>
      </div>
      <h3>Vocab Trainer<button onClick={handleStart} className="vocab-trainer-button">Start</button></h3>
      <div className="normal-container vocab-trainer-container">
        {/* <button onClick={handleStart} className="vocab-trainer-button">Start</button> */}
        <div className="trainer">
          <h4>Original</h4>
          {/* <input className="vocab-trainer-input" type="text" id="base-language" defaultValue="pt-BR" placeholder="Base Language"></input> */}
          <input className="vocab-trainer-input" type="text" id="target-language" defaultValue="fr" placeholder="Target Language"></input>
          <div>{translated_sentence}</div>
          <h4>Your Translation:</h4>
          <input className="vocab-trainer-input" type="text" name="name" id="name" placeholder="Your Translation"></input>
          <button className="vocab-trainer-button" onClick={showTranslation}>Check</button>

          <div id="translation">{target_sentence}</div>

          {/* <div>{target_sentence}</div> */}
        </div>
        <div className="trainer-settings">
          <h4>Settings</h4>
        </div>
        <div className="voc-list">{vocsList}</div>
      </div>
    </div >
  )
}