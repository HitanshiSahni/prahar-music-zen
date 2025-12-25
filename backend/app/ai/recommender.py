import os
import json
from groq import Groq

print("GROQ KEY LOADED:", bool(os.getenv("GROQ_API_KEY")))

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """
You are a music recommendation engine.

Context:
- A Raaga is already selected using Indian classical rules.
- Your job is to recommend Spotify-playable music ONLY.

Rules:
- Do NOT decide raaga.
- Do NOT talk about frequencies, healing, or therapy.
- Songs must be available on Spotify.
- Prefer Indian music.
- Genres and languages are constraints.
- Return ONLY valid JSON.

Output schema:
{
  "playback_mode": "SONG" | "PLAYLIST",
  "recommendations": [
    {
      "title": "...",
      "artist": "...",
      "search_query": "spotify search string"
    }
  ],
  "reasoning": "short explanation"
}
"""


def generate_music_recommendation(
    raaga: str,
    genres: list[str],
    languages: list[str]
):
    user_prompt = f"""
Raaga: {raaga}
Genres: {", ".join(genres)}
Languages: {", ".join(languages)}

Recommend suitable songs.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT.strip()},
            {"role": "user", "content": user_prompt.strip()}
        ],
        temperature=0.3
    )

    content = response.choices[0].message.content.strip()

    # 🔍 Debug (keep during development)
    print("AI RAW RESPONSE:\n", content)

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        return {
            "playback_mode": "SONG",
            "recommendations": [],
            "reasoning": "AI response could not be parsed"
        }
