from bson import ObjectId

from app.models.article import Article


def test_delete_article_exist(client, mock_article_gen):

    collection = Article.collection()

    article1 = mock_article_gen(title="First")
    article2 = mock_article_gen(title="Second")

    assert collection.count_documents({}) == 2

    resp = client.delete(f"/article/{article1.id}")

    print(resp.json())
    assert resp.status_code == 200
    assert collection.count_documents({}) == 1


def test_delete_article_doesnt_exist(client, mock_article_gen):

    collection = Article.collection()

    non_existent_id = ObjectId()
    article1 = mock_article_gen(title="First")
    article2 = mock_article_gen(title="Second")

    assert collection.count_documents({}) == 2

    resp = client.delete(f"/article/{non_existent_id}")

    assert resp.status_code == 404
    assert collection.count_documents({}) == 2
