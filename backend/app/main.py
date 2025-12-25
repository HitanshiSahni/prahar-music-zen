from dotenv import load_dotenv
load_dotenv()  # ✅ LOAD .env BEFORE anything else

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.recommend import router as recommend_router

app = FastAPI(title="Prahar Music Zen API")

# ✅ CORS FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommend_router, prefix="/api")
