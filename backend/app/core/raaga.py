from app.data.raaga_catalog import RAAGA_CATALOG


def select_raaga(prahar: str, rasa: str | None):
    """
    Deterministic raaga selection using Prahar + optional Rasa
    """

    # 1️⃣ Filter by prahar
    prahar_matches = [
        r for r in RAAGA_CATALOG
        if prahar in r.get("prahars", [])
    ]

    if not prahar_matches:
        print("⚠️ No prahar match found, using fallback")
        return RAAGA_CATALOG[0]["name"]

    # 2️⃣ If rasa exists, refine
    if rasa:
        rasa_matches = [
            r for r in prahar_matches
            if rasa in r.get("rasas", [])
        ]
        if rasa_matches:
            return rasa_matches[0]["name"]

    # 3️⃣ Default prahar-based raaga
    return prahar_matches[0]["name"]
