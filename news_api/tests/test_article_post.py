from datetime import datetime

from app.models.article import Article


def test_create_article_valid(client):

    collection = Article.collection()
    assert collection.count_documents({}) == 0

    now = datetime.utcnow().replace(microsecond=0)
    args = {
        "title": "My Article",
        "content": "this is a pytest",
        "published_at": now.isoformat()
    }

    resp = client.post("/article/", json=args)

    assert resp.status_code == 201
    assert collection.count_documents({}) == 1
    from_db = collection.find_one()

    assert from_db["_id"] is not None
    assert from_db["title"] == args["title"]
    assert from_db["content"] == args["content"]


def test_create_article_default_date(client):

    collection = Article.collection()
    assert collection.count_documents({}) == 0

    args = {
        "title": "My Article",
        "content": "this is a pytest"
    }

    resp = client.post("/article/", json=args)

    assert resp.status_code == 201
    assert collection.count_documents({}) == 1
    from_db = collection.find_one()

    assert from_db["published_at"] is not None
