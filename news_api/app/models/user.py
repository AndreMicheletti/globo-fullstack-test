import pymongo
from pydantic import BaseModel, validator, ValidationError

from db import MongoCollection


class User(MongoCollection, BaseModel):

    id: str
    username: str
    hashed_password: str

    @classmethod
    def from_mongodb(cls, document: dict) -> "User":
        aux = dict(document)
        aux["id"] = str(aux["_id"])
        aux.pop("_id")
        return User(**aux)

    _collection_name = "user"

    _indexes = [
        dict(fields=[('username', pymongo.ASCENDING)], unique=True)
    ]


class UserIn(BaseModel):

    username: str
    password: str

    @validator("password")
    def hash_password(cls, value):
        from auth import get_password_hash
        if value == "":
            raise ValidationError("password cannot be empty", model=UserIn)
        if len(value) <= 2:
            raise ValidationError("password must have at least 2 characters", model=UserIn)
        return get_password_hash(value)

    def to_document(self) -> dict:
        return dict(
            username=self.username,
            hashed_password=self.password
        )


class UserOut(BaseModel):

    username: str
