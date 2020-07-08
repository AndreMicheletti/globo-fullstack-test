


def test_client_fixture(client):

    resp = client.get("/alive")
    print(resp)
    assert resp.status_code == 200
