from app.models.user import User, UserIn, UserOut


async def create_user(user_input: UserIn) -> UserOut:

    collection = User.collection()

    doc = user_input.to_document()
    resp = collection.insert_one(doc)

    doc["_id"] = resp.inserted_id

    return UserOut(username=user_input.username)


def get_user_by_username(username: str) -> User:

    collection = User.collection()
    found = collection.find_one({
        "username": username
    })

    if not found:
        return None

    return User.from_mongodb(found)
