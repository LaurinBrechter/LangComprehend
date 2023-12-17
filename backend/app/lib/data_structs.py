from enum import Enum
from pydantic import BaseModel

class Text(BaseModel):
    text:str

class Languages(str, Enum):
    fr: dict = {"name": "French", "code": "fr", "model": "fr_core_news_sm"}
    en: dict = {"name": "English", "code": "en", "model": "en_core_web_sm"}
    de: dict = {"name": "German", "code": "de", "model": "de_core_news_sm"}
    es: dict = {"name": "Spanish", "code": "es", "model": "es_core_news_sm"}
    it: dict = {"name": "Italian", "code": "it", "model": "it_core_news_sm"}
    pt: dict = {"name": "Portuguese", "code": "pt", "model": "pt_core_news_sm"}
    zh : dict = {"name": "Chinese", "code": "zh", "model": "zh_core_web_sm"}


class Worksheet(BaseModel):
    questions: list[str] = []
    answers: list[str] = []
    topics: list[str] = []

class VocabAnswer(BaseModel):
    original_text: str
    user_translation: str

class VocabularyList(BaseModel):
    vocs_list: list[str] = []