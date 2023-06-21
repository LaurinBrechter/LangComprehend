from fastapi import FastAPI, Path
from fastapi.middleware.cors import CORSMiddleware
from enum import Enum
try: 
    from funcs import (
        get_video_text,
        get_qa_topic
    )
except:
    from app.funcs import (
        get_video_text,
        get_qa_topic
    )
from pydantic import BaseModel
from typing import Annotated

class Text(BaseModel):
    text:str


class Languages(str, Enum):
    pass


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5173",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/downloadVideo")
async def downloadVideo(url:str="https://www.youtube.com/watch?v=rxOQtLbaeuw&ab_channel=LeMonde", language:str="fr"):
    return {"video_text": get_video_text(url, language)}


@app.get("/generateQuestions")
async def generateQuestions(text:Text, num_questions:Annotated[int, Path(title="the number of questions that should ge generated", ge=1, le=10)]=3, language:str="fr", fraction:float=1):
    res = get_qa_topic(num_questions, text, language, fraction)
    return {"questions": res}



# uvicorn main:app --reload
