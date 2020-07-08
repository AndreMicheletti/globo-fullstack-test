from typing import Union, Optional, List

from bson import ObjectId

from app.models.article import ArticleInput, Article


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

    if isinstance(article_id, str):
        article_id = ObjectId(article_id)

    assert isinstance(article_id, ObjectId)

    collection = Article.collection()
    found = collection.find_one(article_id)

    if not found:
        return None

    return Article.from_mongodb(found)


def get_all_articles() -> List[Article]:

    collection = Article.collection()
    all_articles = collection.find({})

    return list(map(Article.from_mongodb, all_articles))
