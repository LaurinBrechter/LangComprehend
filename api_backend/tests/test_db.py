from fastapi.testclient import TestClient
from app.main import app
from app.data_structs import Text, Languages, Worksheet
import json
from dotenv import load_dotenv
import os

load_dotenv()


client = TestClient(app)
os.environ["DB_NAME"] = "test"
def test_get_n_total_vocs():
    response = client.get("/vocabs/total", params={"u_id":1})
    assert response.status_code == 200
    assert response.json() == 9

