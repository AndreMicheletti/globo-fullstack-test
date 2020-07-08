import pytest
from fastapi.testclient import TestClient


@pytest.fixture(scope='function')
def client():
    from main import create_app
    app = create_app()
    return TestClient(app)
