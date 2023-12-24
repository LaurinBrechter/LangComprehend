import { config } from 'process';

export const getVideoData = async(formData: FormData) => {
  
    console.log(formData)
  
    let language = (document.getElementById("target-language") as HTMLInputElement).value
    let url = (document.getElementById("video-url") as HTMLInputElement).value
    let params = { language: language, url: url }
    let url_w_query = "http://localhost:8000/worksheet/downloadVideo" + '?' + (new URLSearchParams(params)).toString();
  
    // const video_id = retrieveVideoId(url)
    const res = await fetch(url_w_query)
    const data = await res.json()
    console.log(data)
    return data.video_text
  }