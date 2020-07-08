.DEFAULT_GOAL := default

start-api:
	@ python3 ./news_api/main.py

start-front:
	@ cd news_front/ && npm start

mongo-local:
	@ docker run -p 27017:27017 -d mongo

test:
	cd news_api/ && pytest --cov=app --cov-report=html

cov-report:
	@ browse .news_api/htmlcov/index.html

default:
	@ echo "Invalid target.\nUsage:\ncross-plataform: make start\nlocal development: make [start-local/mongo-local]"
