from typing import Union, Optional, List

from bson import ObjectId

from app.models.article import ArticleInput, Article
from app.utils import ensure_object_id


def create_article(article_input: ArticleInput) -> Article:

    collection = Article.collection()
    document = article_input.dict()

    resp = collection.insert_one(document)
    inserted_id = resp.inserted_id

    document["_id"] = inserted_id

    return Article.from_mongodb(
        document
    )


def get_article_by_id(article_id: Union[str, ObjectId]) -> Optional[Article]:

    article_id = ensure_object_id(article_id)

    collection = Article.collection()
    found = collection.find_one(article_id)

    if not found:
        return None

    return Article.from_mongodb(found)


def get_all_articles() -> List[Article]:

    collection = Article.collection()
    all_articles = collection.find({})

    return list(map(Article.from_mongodb, all_articles))


def update_article_by_id(
    article_id: Union[str, ObjectId],
    article_args: ArticleInput
) -> Optional[Article]:

    collection = Article.collection()
    article_id = ensure_object_id(article_id)

    resp = collection.update_one(
        dict(_id=article_id),
        {
            "$set": article_args.dict()
        }
    )

    if resp.modified_count == 1:
        return Article(
            id=str(article_id),
            **article_args.dict()
        )
    else:
        return None


def delete_article_by_id(article_id: str) -> bool:

    collection = Article.collection()
    article_id = ensure_object_id(article_id)

    resp = collection.delete_one(
        dict(_id=article_id)
    )

    return resp.deleted_count == 1
