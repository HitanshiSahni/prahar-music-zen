import { RecommendResponse } from "@/lib/api";

export type UIRecommendation = {
  prahar: string;
  raaga: string;
  recommendations: {
    title: string;
    artist: string;
    search_query?: string;
  }[];
  explanation?: string;
};

export function adaptRecommendation(
  raw: RecommendResponse
): UIRecommendation {
  return {
    prahar: raw.prahar,
    raaga: raw.raaga,
    recommendations: raw.ai.recommendations,
    explanation: raw.ai.reasoning,
  };
}
