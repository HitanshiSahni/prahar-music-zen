from datetime import datetime
import pytz

IST = pytz.timezone("Asia/Kolkata")

def get_prahar_from_timestamp(timestamp: str) -> str:
    """
    Convert ISO timestamp → IST → return prahar
    """

    # Parse ISO timestamp
    dt = datetime.fromisoformat(timestamp.replace("Z", "+00:00"))

    # Convert to IST
    ist_time = dt.astimezone(IST)
    hour = ist_time.hour

    # DEBUG (keep this for now)
    print("IST TIME →", ist_time.strftime("%H:%M"))

    # Prahar mapping (STRICT)
    if 6 <= hour < 12:
        return "Morning"
    elif 12 <= hour < 18:
        return "Afternoon"
    elif 18 <= hour < 24:
        return "Evening"
    else:
        return "Night"
