from datetime import datetime

import pytest
from fastapi.testclient import TestClient


@pytest.fixture(scope='function')
def client(mongo):
    from main import create_app
    app = create_app()
    return TestClient(app)


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
