"use server"

export const  getWorksheetData = async(formData: FormData) => {
  
    console.log(formData)
  
    let language = (document.getElementById("target-language") as HTMLInputElement).value
    let text = (document.getElementById("text") as HTMLInputElement).innerHTML
    let name = (document.getElementById("worksheet-name") as HTMLInputElement).value
    let num_questions = (document.getElementById("num-questions") as HTMLInputElement).value

    let params = { language: language, num_questions: num_questions, name: name }
    let url_w_query = "http://localhost:8000/worksheet/generateWorksheet" + '?' + (new URLSearchParams(params)).toString();

    const res = await fetch(url_w_query, {
      method: 'POST',
      body: JSON.stringify({ text: text }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const ws_id = await res.json()

    return ws_id
    // let params = { language: language, url: url }
    // let url_w_query = "http://localhost:8000/worksheet/downloadVideo" + '?' + (new URLSearchParams(params)).toString();
  
    // const video_id = retrieveVideoId(url)
    // const res = await fetch(url_w_query)
    // const data = await res.json()
    // console.log(data)
    // return data.video_text
  }