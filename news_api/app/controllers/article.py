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
