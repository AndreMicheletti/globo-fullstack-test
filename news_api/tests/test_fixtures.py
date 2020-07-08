from datetime import datetime

from app.models.article import Article

from bson import ObjectId


def test_client_fixture(client):

    resp = client.get("/alive")
    assert resp.status_code == 200

    body = resp.json()
    assert body == {"message": "Hello World"}


def test_mock_article(mock_article_gen):

    collection = Article.collection()
    assert collection.count_documents({}) == 0

    title = "mytitle"
    content = "mycontent"
    published_at = datetime.utcnow()

    article = mock_article_gen(title=title, content=content, published_at=published_at)

    assert collection.count_documents({}) == 1
    assert article.id is not None

    from_db = collection.find_one(ObjectId(article.id))

    assert from_db is not None
    assert article.id == str(from_db["_id"])
    assert article.title == str(from_db["title"])
    assert article.content == str(from_db["content"])
