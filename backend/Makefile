install: 
	pip install --upgrade pip &&\
		pip install -r requirements.txt
test: 
	python -m pytest
run:
	uvicorn api_backend.main:app --reload
lint:
	pylint --disable=R,C app/main.py
