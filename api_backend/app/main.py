import json
from fastapi import FastAPI, Path
from fastapi.middleware.cors import CORSMiddleware
from enum import Enum
import spacy
from app.data_structs import (
    Text, 
    Languages, 
    Worksheet, 
    VocabAnswer,
    VocabularyList
)
from app.funcs import (
        get_video_text,
        get_qa_topic,
        get_vocab,
        correct_vocab,
        add_vocab_to_db
    )
from pydantic import BaseModel
from typing import Annotated
from pymongo import MongoClient

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

client = MongoClient("mongodb://localhost:27017")
nlp = spacy.load('fr_core_news_sm')


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/downloadVideo")
async def downloadVideo(url:str="https://www.youtube.com/watch?v=rxOQtLbaeuw&ab_channel=LeMonde", language:str="fr"):
    return {"video_text": get_video_text(url, language)}


@app.post("/generateVocab")
async def generateVocab(text:Text, language:str="fr") -> dict:
    v = list(get_vocab(nlp, text.text, ["PUNCT", "SPACE", "NUM"])["vocab"].keys())

    print(v)
    return {"vocs_list": v}

@app.post("/generateWorksheet")
async def generateWorksheet(
    text:Text, 
    num_questions:Annotated[int, Path(title="the number of questions that should ge generated", ge=1, le=10)]=3, 
    language:str="fr", fraction:float=1
    ) -> Worksheet:
    
    res = get_qa_topic(num_questions, text, language, fraction)

    return json.loads(res)


@app.post("/correctVocab")
async def correctVocab(text:VocabAnswer, language:str="fr") -> str:
    return correct_vocab(text)


@app.post("/insertVocabs")
async def insertVocabs(vocabs:VocabularyList) -> list:
    
    add_vocab_to_db(client, "dev", "vocabs", vocabs, 1)

    return True    
# uvicorn app.main:app --reload