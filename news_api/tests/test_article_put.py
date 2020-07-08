from bson import ObjectId

from app.models.article import Article
from app.controllers.article import get_article_by_id


def test_put_article_exist(client, mock_article):

    collection = Article.collection()
    assert collection.count_documents({}) == 1

    article = mock_article
    args = {
        "title": "My New Title",
        "content": "different now"
    }

    resp = client.put(f"/article/{article.id}", json=args)

    assert resp.status_code == 200

    from_db = get_article_by_id(article.id)

    assert from_db.title == "My New Title"
    assert from_db.content == "different now"
    assert collection.count_documents({}) == 1


def test_put_article_doesnt_exist(client, mock_article):

    non_existent_id = str(ObjectId())
    collection = Article.collection()
    assert collection.count_documents({}) == 1

    args = {
        "title": "My New Title",
        "content": "different now"
    }
    resp = client.put(f"/article/{non_existent_id}", json=args)

    assert resp.status_code == 404

    from_db = get_article_by_id(mock_article.id)

    assert from_db.title == mock_article.title
    assert from_db.content == mock_article.content
    assert collection.count_documents({}) == 1
