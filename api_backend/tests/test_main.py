from fastapi.testclient import TestClient
from app.main import app
from app.data_structs import Text, Languages, Worksheet

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

def test_downloadVideo():
    reponse = client.get("/downloadVideo", params={"url": "https://www.youtube.com/watch?v=rxOQtLbaeuw&ab_channel=LeMonde", "language": "fr"})
    assert reponse.status_code == 200

def test_generateVocab():
    response = client.post("/generateVocab", json={"text": "Le monde est bon de du"})
    assert response.status_code == 200
    assert response.json() == {"vocs_list": ["le","monde","être", "bon", "de"]}