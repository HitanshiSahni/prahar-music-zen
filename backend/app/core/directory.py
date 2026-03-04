from fastapi import APIRouter, UploadFile, File, Form, HTTPException
import os
from pathlib import Path
import json
import google.generativeai as genai
from werkzeug.utils import secure_filename
from urllib.parse import quote
import zipfile
import shutil
import uuid
import logging
import librosa
import numpy as np
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(tags=["music"])

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not set in .env")

genai.configure(api_key=GEMINI_API_KEY)

BASE_DIR = Path(__file__).resolve().parent.parent
MUSIC_FOLDER = BASE_DIR / "songs"
MUSIC_FOLDER.mkdir(exist_ok=True)

DATA_FOLDER = BASE_DIR / "data"
DATA_FOLDER.mkdir(exist_ok=True)
JSON_FILE = DATA_FOLDER / "vibe_data.json"

MODEL_NAME = "gemini-1.5-flash"

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_vibe_data():
    if JSON_FILE.exists():
        with open(JSON_FILE, "r") as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []

def save_vibe_data(data):
    with open(JSON_FILE, "w") as f:
        json.dump(data, f, indent=4)

def analyze_with_librosa(file_path: Path, filename: str):
    """
    Analyzes physical audio properties and returns layman-friendly reasons.
    """
    try:
        y, sr = librosa.load(str(file_path), sr=22050, duration=30, offset=15.0)

        tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
        bpm = float(tempo[0]) if isinstance(tempo, np.ndarray) else float(tempo)

        rms = librosa.feature.rms(y=y)
        mean_rms = float(np.mean(rms))

        spec_cent = librosa.feature.spectral_centroid(y=y, sr=sr)
        mean_spec_cent = float(np.mean(spec_cent))

        mood = "calm"
        intensity = 0.5
        reason = ""

        # Layman interpretable reasons
        if bpm > 115 and mean_rms > 0.12:
            mood = "energetic"
            intensity = min(1.0, mean_rms * 4.0)
            reason = "A fast-paced, powerful track with a lot of driving energy to get you moving."
        elif bpm > 100 and mean_spec_cent > 1600:
            mood = "happy"
            intensity = min(1.0, mean_spec_cent / 4000.0)
            reason = "An upbeat and lively song with a bright, cheerful sound."
        elif bpm < 100 and mean_rms < 0.1:
            mood = "calm"
            intensity = max(0.0, 1.0 - (mean_rms * 5.0))
            reason = "A gentle, relaxing track with a soft and soothing rhythm."
        else:
            mood = "sad"
            intensity = max(0.0, 1.0 - (bpm / 160.0))
            reason = "A slower, moody song with a deep and emotional atmosphere."

        return {
            "song_name": filename,
            "mood": mood,
            "mood_intensity": round(max(0.0, min(1.0, intensity)), 2),
            "reason": reason
        }

    except Exception as e:
        logger.error(f"Librosa analysis failed for {filename}: {e}")
        return {
            "song_name": filename,
            "mood": "calm",
            "mood_intensity": 0.1,
            "reason": "A quiet, low-key track."
        }

@router.post("/upload-zip")
async def upload_zip(zip_file: UploadFile = File(...)): 
    if not zip_file.filename.lower().endswith(".zip"):
        raise HTTPException(status_code=400, detail="File must be .zip")

    temp_zip = MUSIC_FOLDER / f"temp_{uuid.uuid4().hex[:10]}.zip"
    existing_data = load_vibe_data()
    
    try:
        with temp_zip.open("wb") as buffer:
            shutil.copyfileobj(zip_file.file, buffer)

        analyzed_songs = []
        with zipfile.ZipFile(temp_zip, 'r') as zf:
            for member in zf.namelist():
                if member.lower().endswith(".mp3"):
                    clean_name = secure_filename(Path(member).name)
                    target = MUSIC_FOLDER / clean_name

                    zf.extract(member, MUSIC_FOLDER)
                    extracted_file = MUSIC_FOLDER / member
                    
                    if extracted_file.exists():
                        if extracted_file != target:
                            shutil.move(str(extracted_file), str(target))
                        
                        logger.info(f"Running Librosa analysis on: {clean_name}")
                        song_data = analyze_with_librosa(target, clean_name)
                        
                        existing_data = [d for d in existing_data if d["song_name"] != clean_name]
                        existing_data.append(song_data)
                        analyzed_songs.append(clean_name)

        save_vibe_data(existing_data)
        return {"success": True, "added": analyzed_songs}

    except Exception as e:
        logger.error(f"Zip processing failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Zip processing failed: {str(e)}")
    finally:
        if temp_zip.exists():
            temp_zip.unlink()

@router.post("/local-recommend")
async def get_recommendations(
    mood: str = Form(...),
    count: int = Form(8)
):
    valid_moods = ["calm", "happy", "energetic", "sad"]
    if mood not in valid_moods:
        raise HTTPException(status_code=400, detail=f"Mood must be one of {valid_moods}")

    requested_count = max(1, min(30, count))
    library = load_vibe_data()

    matches = [song for song in library if song["mood"] == mood]
    matches.sort(key=lambda x: x["mood_intensity"], reverse=True)

    formatted_matches = []
    for match in matches[:requested_count]:
        formatted_matches.append({
            "filename": match["song_name"],
            "reason": match['reason'],
            "file_url": f"/songs/{quote(match['song_name'])}",
            "is_local": True
        })

    # Return local matches if found
    if formatted_matches:
        return {
            "success": True,
            "message": "",
            "is_fallback": False,
            "recommendations": formatted_matches
        }

    # Fallback to AI if no local songs found
    prompt = f"""
    The user is looking for '{mood}' songs, but their local library doesn't have any.
    Recommend {requested_count} popular, real-world songs that perfectly fit the '{mood}' vibe.
    Return ONLY JSON:
    {{"recommendations": [{{"filename": "Song Name - Artist", "reason": "Why it fits..."}}]}}
    """
    try:
        model = genai.GenerativeModel(
            model_name=MODEL_NAME, 
            generation_config={"response_mime_type": "application/json"}
        )
        response = model.generate_content(prompt)
        ai_data = json.loads(response.text.strip())
        
        fallback_recs = []
        for rec in ai_data.get("recommendations", []):
            fallback_recs.append({
                "filename": rec.get("filename"),
                "reason": rec.get("reason"),
                "file_url": "", 
                "is_local": False
            })

        return {
            "success": True,
            "message": "songs not found according to the mood",
            "is_fallback": True,
            "recommendations": fallback_recs
        }
    except Exception as e:
        logger.error(f"Fallback generation failed: {e}")
        # Even if AI fails, we MUST tell the frontend that local songs weren't found
        return {
            "success": False, 
            "message": "songs not found according to the mood", 
            "is_fallback": True, 
            "recommendations": []
        }
