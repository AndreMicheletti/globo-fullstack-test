from datetime import datetime

import pytest
from fastapi.testclient import TestClient


@pytest.fixture(scope='function')
def client(mongo, logged_user):
    from main import create_app
    app = create_app()
    client = TestClient(app)
    client.headers.update({
        "Authorization": "testauth"
    })
    return client


@pytest.fixture(scope='function')
def logged_user(monkeypatch):
    import auth

    def mocked_get_current_user():
        return True

    monkeypatch.setattr(auth, "get_current_user", mocked_get_current_user)


@pytest.fixture(scope='function')
def mongo(mongodb, monkeypatch):
    from random import randint

    client = mongodb

    db = client[f"pytest_{randint(1, 1000)}"]

    monkeypatch.setattr("db.client", client)
    monkeypatch.setattr("db.db", db)


@pytest.fixture(scope='function')
def mock_article_gen(mongo):
    from app.models.article import ArticleInput
    from app.controllers.article import create_article

    now = datetime.utcnow().replace(microsecond=0)

    def make_mock(
        title="Test Article",
        content="content from article",
        published_at=now
    ):
        args = ArticleInput(title=title, content=content, published_at=published_at)
        return create_article(args)

    return make_mock


@pytest.fixture(scope='function')
def mock_article(mock_article_gen):
    return mock_article_gen()
