from fastapi.testclient import TestClient
from app.main import app
from api_backend.app.lib.data_structs import Text, Languages, Worksheet
import json
from dotenv import load_dotenv

load_dotenv()

client = TestClient(app)
examples = json.load(open("api_backend/tests/examples.json", "r"))


def test_generate_worksheet():
    response = client.post(
        url="/generateWorksheet",
        json={
            "text": examples["texts"][0]
        }
    )
    assert response.status_code == 200

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

def test_download_video():
    reponse = client.get("/downloadVideo", params={"url": "https://www.youtube.com/watch?v=rxOQtLbaeuw&ab_channel=LeMonde", "language": "fr"})
    assert reponse.status_code == 200

def test_generate_vocab():
    response = client.post("/generateVocab", json={"text": "Le monde est bon de du"})
    assert response.status_code == 200
    assert response.json() == {"vocs_list": ["le","monde","être", "bon", "de"]}

def test_correct_vocab():
    response = client.post(
        url="/vocabs/correctVocab", 
        params={
          "language": "fr",  
        },
        json={
            "original_text": examples["translations"][0]["original"],
            "user_translation": examples["translations"][0]["user"],
        }
    )

    assert response.status_code == 200

    assert response.json() == "True"