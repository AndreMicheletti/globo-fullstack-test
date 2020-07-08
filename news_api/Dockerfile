FROM python:3.7
RUN pip3 install --upgrade pip
WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY ./ ./

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
