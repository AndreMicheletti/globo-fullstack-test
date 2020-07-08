from datetime import datetime
from typing import Optional

import pymongo
from pydantic import BaseModel, validator

from db import MongoCollection


class Article(MongoCollection, BaseModel):

    id: str
    title: str
    content: str
    published_at: datetime

    @classmethod
    def from_mongodb(cls, document: dict) -> "Article":
        aux = dict(document)
        aux["id"] = str(aux["_id"])
        aux.pop("_id")
        return Article(**aux)

    _collection_name = "article"

    _indexes = [
        dict(fields=[('title', pymongo.ASCENDING)]),
        dict(fields=[('published_at', pymongo.ASCENDING)]),
    ]


class ArticleInput(BaseModel):

    title: str
    content: str
    published_at: Optional[datetime]

    @validator('published_at', pre=True, always=True)
    def set_date_now(cls, v):
        return v or datetime.utcnow()
