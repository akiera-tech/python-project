# Notes API

A simple FastAPI application for managing notes with an in-memory store.

## Installation

```bash
pip install -r requirements.txt
```

## Run the API

```bash
uvicorn app.main:app --reload --port 8000
```

## Endpoints

- **GET /health** - Health check endpoint
- **GET /api/notes** - Retrieve all notes
- **POST /api/notes** - Create a new note (body: `{"text": "your note text"}`)

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
