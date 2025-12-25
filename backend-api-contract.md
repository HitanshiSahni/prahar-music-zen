# AI Music Productivity System – Backend API Contract

This document defines the request and response structure between the frontend
(React application) and the backend (FastAPI service) for the AI-powered
music productivity system.

The backend is responsible for all intelligence, AI processing, and
third-party integrations.

---

## 1. Recommendation API

### Purpose
Generate personalized music recommendations using:
- User mood
- Indian classical Rasa mapping
- Prahar (time of day)
- Selected genre
- Selected language

This API is the core intelligence endpoint of the system.

---

### Endpoint


POST /api/recommend


---

### Request Body (Frontend → Backend)

```json
{
  "mood": "Calm",
  "genre": "Semi-Classical",
  "language": "Hindi",
  "timestamp": "2025-09-21T21:30:00"
}

Field Description

mood: User-selected emotional state (e.g., Calm, Energetic, Sad)

genre: Selected music genre
(Indian Classical, Semi-Classical, Bollywood, Indie, Western Pop, Instrumental, Lo-fi)

language: Preferred language (Hindi, English, Marathi)

timestamp: Client-side time in ISO 8601 format used for prahar detection

Response Body (Backend → Frontend)

{
  "rasa": "Shanta",
  "prahar": "Night",
  "raaga": "Yaman",
  "tempo": "Slow",
  "frequency": "432 Hz",
  "explanation": "Night prahar with Shanta rasa aligns with Raaga Yaman."
}


Field Description

rasa: Classical Indian rasa derived from user mood

prahar: Time-of-day segment derived from timestamp

raaga: Recommended raaga based on rasa and prahar

tempo: Suggested tempo (Slow / Medium / Fast)

frequency: Healing frequency suggestion

explanation: Human-readable explanation for transparency and trust

2. Design Notes

Backend is the single source of truth for:

Rasa mapping

Prahar calculation

Raaga recommendation logic

Frontend is responsible only for:

Collecting user input

Displaying recommendations

No AI or Spotify logic exists in the frontend.

GenAI integration will enhance recommendations in later versions.

Spotify search, playback, and playlist creation will be handled entirely by the backend.

3. Future Extensions (Not in Current Version)

GenAI-powered song list generation

Spotify track search and playback

Playlist auto-creation

User preference learning

Analytics and recommendation history

4. Security Considerations

GenAI API keys are stored only in backend environment variables

Spotify OAuth tokens are managed server-side

Frontend never accesses third-party secrets

API will be rate-limited in production

5. Versioning

API Version: v1

Status: Initial Industry-Grade Design

