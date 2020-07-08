from bson import ObjectId
from app.models.article import Article

def test_get_article_exist(client, mock_article):

    article = mock_article

    resp = client.get(f"/article/{article.id}")

    assert resp.status_code == 200
    body = resp.json()

    assert body is not None
    assert body["id"] == str(article.id)
    assert body["title"] == article.title


def test_get_article_doesnt_exist(client, mock_article_gen):

    not_existing_id = str(ObjectId())
    article = mock_article_gen()

    resp = client.get(f"/article/{not_existing_id}")

    assert resp.status_code == 404


def test_get_all_article(client, mock_article_gen):

    article_quantity = 4
    collection = Article.collection()

    for i in range(article_quantity):
        mock_article_gen(title=f"Article n{i}")

    assert collection.count_documents({}) == article_quantity

    resp = client.get("/article/")

    assert resp.status_code == 200
    body = resp.json()

    assert len(body) == article_quantity
