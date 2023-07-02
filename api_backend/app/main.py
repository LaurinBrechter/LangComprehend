import json
from fastapi import FastAPI, Path
from fastapi.middleware.cors import CORSMiddleware
import spacy
from app.data_structs import *
from app.funcs import (
        get_video_text,
        get_qa_topic,
        get_vocab,
        correct_vocab,
        add_vocab_to_db
    )
from typing import Annotated
from pymongo import MongoClient
from dotenv import load_dotenv
import os

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

load_dotenv()

client = MongoClient(os.environ["MONGO_URI"])
DB_NAME = os.environ["DB_NAME"]
voc_col_name = os.environ["VOC_COLL_NAME"]
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

    return {"vocs_list": v}

@app.post("/generateWorksheet")
async def generateWorksheet(
    text:Text, 
    num_questions:Annotated[int, Path(title="the number of questions that should ge generated", ge=1, le=10)]=3, 
    language:str="fr", fraction:float=1
    ) -> Worksheet:
    
    res = get_qa_topic(num_questions, text, language, fraction)

    return json.loads(res)


@app.post("/vocabs/correctVocab")
async def correctVocab(text:VocabAnswer, language:str="fr") -> str:
    return correct_vocab(text)


@app.post("/vocabs/insertVocabs")
async def insertVocabs(vocabs:VocabularyList) -> bool:
    res = add_vocab_to_db(client, DB_NAME, voc_col_name, vocabs, 1)
    return res.acknowledged    

@app.get("/vocabs/getExamples")
async def getExamples(n_examples:int) -> dict:
    return {"examples": ["Je suis un homme", "Je suis une femme", "Je suis un garçon", "Je suis une fille"]}


@app.get("/vocabs/total")
async def getTotalVocabs(u_id:int) -> int:
    coll = client[DB_NAME][voc_col_name]
    return len(list(coll.find({"u_id": u_id}, {"_id": 0, "vocab": 1})))

@app.get("/vocabs/getAll")
async def getAll(u_id:int) -> dict:
    coll = client[DB_NAME][voc_col_name]

    return {"vocabs": [i["vocab"] for i in list(coll.find({"u_id": u_id}, {"_id": 0, "vocab": 1}))]}



# uvicorn app.main:app --reload