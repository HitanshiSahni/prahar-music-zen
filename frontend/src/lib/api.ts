export interface RecommendRequest {
  mood: string;
  genre: string;
  language: string;
  timestamp: string;
}

export interface RecommendResponse {
  rasa: string;
  prahar: string;
  raaga: string;
  tempo: string;
  frequency: string;
  explanation: string;
}

export async function fetchRecommendation(
  payload: RecommendRequest
): Promise<RecommendResponse> {
  const response = await fetch("http://127.0.0.1:8000/api/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recommendation");
  }

  return response.json();
}
