from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uuid

app = FastAPI(title="Notes API")

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model
class Note(BaseModel):
    id: str
    text: str

class NoteCreate(BaseModel):
    text: str

# In-memory storage
notes_db: List[Note] = [
    Note(id=str(uuid.uuid4()), text="Welcome to the Notes API"),
    Note(id=str(uuid.uuid4()), text="Create your first note using POST /api/notes"),
]

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "notes-api"}

@app.get("/api/notes", response_model=List[Note])
async def get_notes():
    """Retrieve all notes"""
    return notes_db

@app.post("/api/notes", response_model=Note, status_code=201)
async def create_note(note: NoteCreate):
    """Create a new note"""
    new_note = Note(
        id=str(uuid.uuid4()),
        text=note.text
    )
    notes_db.append(new_note)
    return new_note
