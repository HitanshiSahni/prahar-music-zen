from pydantic import BaseModel


class RecommendRequest(BaseModel):
    mood: str
    genre: str
    language: str
    timestamp: str
