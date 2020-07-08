from typing import Union

from bson import ObjectId


def ensure_object_id(value: Union[str, ObjectId]) -> ObjectId:
    if isinstance(value, ObjectId):
        return value
    if isinstance(value, str):
        return ObjectId(value)
    raise ValueError(f"{value} of type {type(value)} is not a valid object id")
