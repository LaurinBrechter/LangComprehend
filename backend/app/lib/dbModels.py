from sqlalchemy import Column, Integer, String, Date, func, LargeBinary
from .database import Base
from sqlalchemy.dialects.postgresql import ARRAY

class WorksheetDB(Base):
    __tablename__ = "worksheets"
    __table_args__ = {'schema': 'lc'}

    # TODO set primary key/index to true
    id = Column(Integer, primary_key=True, autoincrement=True)
    language = Column(String)
    questions = Column(ARRAY(String))
    answers = Column(ARRAY(String))
    topics = Column(ARRAY(String))
    text = Column(LargeBinary)
    created_at = Column(Date, default=func.now())
    name = Column(String)


class VocabsDB(Base):
    __tablename__ = "vocabs"
    __table_args__ = {'schema': 'lc'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    language = Column(String)
    vocabs = Column(String)
    created_at = Column(Date, default=func.now())