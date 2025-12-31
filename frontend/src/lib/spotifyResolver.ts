/* --------------------------------------------------
   Spotify Playlist Resolver
   --------------------------------------------------
   Rules:
   - Mood + Bollywood → Navarasa playlists
   - Skip Mood + Bollywood → Bollywood default
   - Classical → Prahar playlists
   - Skip Mood + Skip Genre → Prahar playlists
   - Semi-Classical → Single playlist
   - Devotional → Single playlist
-------------------------------------------------- */

type ResolverInput = {
  mood: string | null;
  genre: string | null;
  prahar: string | null;
};

/* ---------- Helpers ---------- */

function normalizePrahar(prahar: string | null): string | null {
  if (!prahar) return null;
  return prahar.charAt(0).toUpperCase() + prahar.slice(1).toLowerCase();
}

/* ---------- Playlist Maps ---------- */

const NAVARASA_PLAYLISTS: Record<string, string> = {
  Calm: "https://open.spotify.com/playlist/0Y15gTTCBxXvT0KiYtJwFE", // Shanta
  Romantic: "https://open.spotify.com/playlist/7EnYfdPrEGUb367nr5A26D", // Sringara
  Focused: "https://open.spotify.com/playlist/2UFpJjbr3dZoetmAnThVYq", // Veera
  Energetic: "https://open.spotify.com/playlist/5fFfdMBmeXac35CYheDYI5", // Raudra
  Sad: "https://open.spotify.com/playlist/1D282Rj0q3KAjSLurBF2g4", // Karuna
  Anxious: "https://open.spotify.com/playlist/7zSC6vxnSfzGzE1uA59HHe", // Bhayanaka
};

const BOLLYWOOD_DEFAULT =
  "https://open.spotify.com/playlist/0cSvlLB2tDHsEtJYiGYkBs";

const PRAHAR_PLAYLISTS: Record<string, string> = {
  Morning:
    "https://open.spotify.com/playlist/5DCAqxPkF0Zp1gW3ZN134R",
  Afternoon:
    "https://open.spotify.com/playlist/6TvRbp3Lmg3D6Me35P7B7B",
  Evening:
    "https://open.spotify.com/playlist/0F7nio6uGUV8iuPiNLH0cL",
  Night:
    "https://open.spotify.com/playlist/0dgN55T4M7D3nB9PsqDc9t",
};

const SEMI_CLASSICAL =
  "https://open.spotify.com/playlist/2Juf21jQGGQXmKvemSYM9F";

const DEVOTIONAL =
  "https://open.spotify.com/playlist/7eiJ7L7ptVnTccJMNW1sXf";

/* ---------- Resolver ---------- */

export function resolveSpotifyPlaylist({
  mood,
  genre,
  prahar,
}: ResolverInput): string | null {
  const normalizedPrahar = normalizePrahar(prahar);

  const isMoodSkipped = mood === null || mood === "";
  const isGenreSkipped =
    genre === null || genre === undefined || genre.trim() === "";

  /* ---- Skip EVERYTHING → Prahar playlist ---- */
  if (isMoodSkipped && isGenreSkipped && normalizedPrahar) {
    return PRAHAR_PLAYLISTS[normalizedPrahar] ?? null;
  }

  /* ---- Bollywood ---- */
  if (genre === "Bollywood") {
    if (mood && NAVARASA_PLAYLISTS[mood]) {
      return NAVARASA_PLAYLISTS[mood];
    }
    return BOLLYWOOD_DEFAULT;
  }

  /* ---- Classical ---- */
  if (genre === "Classical" && normalizedPrahar) {
    return PRAHAR_PLAYLISTS[normalizedPrahar] ?? null;
  }

  /* ---- Semi-Classical ---- */
  if (genre === "Semi-Classical") {
    return SEMI_CLASSICAL;
  }

  /* ---- Devotional ---- */
  if (genre === "Devotional") {
    return DEVOTIONAL;
  }

  return null;
}
