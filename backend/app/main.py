from spacy.language import Language
from fastapi import FastAPI, Query, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import spacy
from lib.data_structs import *
from dotenv import load_dotenv
import os
import deepl
from lib.database import SessionLocal, engine
from lib import dbModels
from lib.dbModels import VocabsDB
from sqlalchemy.orm import Session
from lib.funcs import get_qa_topic, get_video_text


origins = [
    "http://localhost:3000",
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

translator = deepl.Translator(os.environ["DEEPL_AUTH_KEY"]) 
DB_NAME = os.environ["DB_NAME"]
voc_col_name = os.environ["VOC_COLL_NAME"]
work_sheet_col_name = os.environ["WORK_SHEET_COLL_NAME"]

port_pipeline = spacy.load('pt_core_news_sm')
pipelines = {
    "fr": spacy.load('fr_core_news_sm'),
    "pt": port_pipeline,
    "pt-BR": port_pipeline,
    "pt-PT": port_pipeline,
    "en": spacy.load('en_core_web_sm'),
}


dbModels.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_nlp() -> dict[str, Language]:
    return pipelines



@app.get("/worksheet/downloadVideo")
async def downloadVideo(url:str, language:str):
    
    resp = get_video_text(url, language)
    
    if not resp:
        raise HTTPException(status_code=404, detail="No Captions found")

    return {"video_text": resp}


# @app.post("/worksheet/vocabFromText")
# async def vocabFromText(text:Text, language:str, db:Session = Depends(get_db)) -> dict:
#     vocabs = list(get_vocab(pipelines[language], text.text, ["PUNCT", "SPACE", "NUM"])["vocab"].keys())

#     db.add_all([VocabsDB(language=language, vocabs=v) for v in vocabs])
#     db.commit()

#     return {"vocs_list": vocabs}


@app.post("/worksheet/generateWorksheet")
async def generateWorksheet(
    text:Text, 
    num_questions:int, 
    language:str, 
    nlp = Depends(get_nlp)
    ) -> dict:
    
    qa = get_qa_topic(num_questions, text, language, nlp, dummy=False)

    return qa


# @app.get("/vocabs/total")
# async def getTotalVocabs(u_id:int, db:Session = Depends(get_db)) -> int:
#     # TODO implement with u_id
#     return db.query(VocabsDB).count()

# @app.get("/vocabs/getAll")
# async def getAll(u_id:int, language:str, db:Session = Depends(get_db)) -> dict:
    
#     vocabs = [i[0] for i in db.query(VocabsDB.vocabs).filter(VocabsDB.language == language).all()]
    
#     return {"vocabs": vocabs}

# @app.post("/vocabs/generateExample")
# async def generateVocabExample(vocabs:VocabularyList, base_language:str, target_language:str) -> dict:
    
#     # generate a sentence in the language that we want to learn.
#     target_sentence = prompt_sentence(vocabs.vocs_list, base_language)
#     print("Generated sentence: ", target_sentence)
#     result = translator.translate_text(target_sentence, target_lang=target_language) 
#     translation = result.text
#     print("Translation: ", translation)
    
#     return {"example": target_sentence, "translation": translation}


# # uvicorn app.main:app --reload