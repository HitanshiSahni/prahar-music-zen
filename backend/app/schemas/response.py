from pydantic import BaseModel


class RecommendResponse(BaseModel):
    rasa: str
    prahar: str
    raaga: str
    tempo: str
    frequency: str
    explanation: str
