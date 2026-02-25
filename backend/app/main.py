from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path

# OLD recommendation router (existing system)
from app.api.recommend import router as recommend_router

# NEW Gemini + upload router
from app.core.directory import router as music_router

app = FastAPI(title="Prahar Music Zen API")

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- ROUTERS ----------------
app.include_router(recommend_router, prefix="/api")
app.include_router(music_router, prefix="/api")

# ---------------- STATIC SONG FILES ----------------
BASE_DIR = Path(__file__).resolve().parent
SONGS_DIR = BASE_DIR / "songs"
SONGS_DIR.mkdir(exist_ok=True)

app.mount("/songs", StaticFiles(directory=SONGS_DIR), name="songs")

# ---------------- HEALTH CHECK ----------------
@app.get("/")
def root():
    return {"status": "Prahar Music Zen backend running"}