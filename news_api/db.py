import os
from typing import List

from pymongo import IndexModel
from pymongo import MongoClient
from pymongo.collection import Collection

MONGO_URL = os.getenv("MONGO_URL", None)
DATABASE_NAME = os.getenv("DATABASE", "globo")


client = MongoClient(MONGO_URL)
db = client[DATABASE_NAME]


def initialize_database():
    """
     This creates the indices needed in the database.
    But for performance reasons, since we are using serverless structure,
    we skip executing this everytime the app is loaded by
    saving a document in the database.
    """
    from app.models import all_models
    from app.constants import INITIALIZATION_DOCUMENT_NAME

    first_start = ConfigCollection.collection().find_one({
        "name": INITIALIZATION_DOCUMENT_NAME
    })

    if first_start:
        if first_start.get("status", False) is True:
            return

    print("INITIALIZING DATABASE...")
    print("CREATING INDEXES ... ", end="")
    for model in all_models:
        model.create_indexes()

    print("DONE")
    ConfigCollection.collection().replace_one(
        {"name": INITIALIZATION_DOCUMENT_NAME},
        {
            "name": INITIALIZATION_DOCUMENT_NAME,
            "status": True
        },
        upsert=True
    )


class MongoCollection:

    _collection_name = None

    _indexes = []

    @classmethod
    def collection(cls) -> Collection:
        return db[cls._collection_name]

    @classmethod
    def indexes(cls) -> List[IndexModel]:
        result = []
        for index_schema in cls._indexes:
            result.append(
                IndexModel(
                    index_schema["fields"],
                    unique=index_schema.get("unique", False)
                )
            )
        return result

    @classmethod
    def create_indexes(cls):
        collection = cls.collection()
        collection.create_indexes(cls.indexes())


class ConfigCollection(MongoCollection):

    _collection_name = "server_config"
