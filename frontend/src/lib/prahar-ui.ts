export type UIPrahar =
  | "Morning"
  | "Afternoon"
  | "Evening"
  | "Night";

export function mapBackendPraharToUI(
  backendPrahar: string
): UIPrahar | null {
  const p = backendPrahar.toLowerCase();

  if (p.includes("morning") || p.includes("dawn")) return "Morning";
  if (p.includes("afternoon") || p.includes("noon")) return "Afternoon";
  if (p.includes("evening") || p.includes("sunset")) return "Evening";
  if (p.includes("night") || p.includes("midnight")) return "Night";

  return null;
}
