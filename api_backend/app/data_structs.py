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
