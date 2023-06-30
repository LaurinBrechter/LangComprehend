from enum import Enum
from pydantic import BaseModel

class Text(BaseModel):
    text:str

class Languages(str, Enum):
    pass

class Worksheet(BaseModel):
    questions: list[str] = []
    answers: list[str] = []
    topics: list[str] = []

class VocabAnswer(BaseModel):
    original_text: str
    user_translation: str

class VocabularyList(BaseModel):
    vocs_list: list[str] = []