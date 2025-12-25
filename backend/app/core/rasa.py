def map_mood_to_rasa(mood: str) -> str:
    mood = mood.lower()

    if mood in ["calm", "peaceful", "relaxed"]:
        return "Shanta"
    if mood in ["happy", "romantic", "joyful"]:
        return "Shringara"
    if mood in ["energetic", "motivated", "confident"]:
        return "Veer"
    if mood in ["sad", "low", "tired"]:
        return "Karuna"
    if mood in ["angry", "frustrated"]:
        return "Raudra"
    if mood in ["anxious", "fearful"]:
        return "Bhayanaka"

    return "Shanta"  # safe default
