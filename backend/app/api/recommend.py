from fastapi import APIRouter
from app.schemas.request import RecommendRequest
from app.core.prahar import get_prahar_from_timestamp
from app.core.rasa import map_mood_to_rasa
from app.core.raaga import select_raaga
from app.ai.recommender import generate_music_recommendation

router = APIRouter()


@router.post("/recommend")
def recommend(payload: RecommendRequest):
    # 1️⃣ Prahar from timestamp
    prahar = get_prahar_from_timestamp(payload.timestamp)

    # 2️⃣ Rasa from mood (optional)
    rasa = map_mood_to_rasa(payload.mood) if payload.mood else None

    # 3️⃣ Deterministic Raaga selection (NO AI)
    raaga = select_raaga(
        prahar=prahar,
        rasa=rasa
    )

    # 4️⃣ Gen-AI → SONGS ONLY
    ai_result = generate_music_recommendation(
        raaga=raaga,
        genres=[payload.genre],
        languages=[payload.language]
    )

    return {
        "prahar": prahar,
        "rasa": rasa,
        "raaga": raaga,
        "ai": ai_result
    }


@router.get("/ai-test")
def ai_test():
    """
    TEMP endpoint to test Gen-AI song output only
    """

    result = generate_music_recommendation(
        raaga="Yaman",
        genres=["Semi-Classical"],
        languages=["Hindi"]
    )

    return result
