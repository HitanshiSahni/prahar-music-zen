export type PraharType = "MORNING" | "AFTERNOON" | "EVENING" | "NIGHT";

export type Raga = {
  name: string;
  prahar: PraharType;
  timeLabel: string;
  mood: string;
  importance: string;
  description: string;
};

export const RAGA_CATALOG: Raga[] = [
  {
    name: "Lalit",
    prahar: "NIGHT",
    timeLabel: "Pre-dawn",
    mood: "Meditative, serious, inward",
    importance: "A rare raga capturing the stillness before sunrise.",
    description:
      "Sung just before sunrise. It feels introspective and spiritually deep.",
  },
  {
    name: "Bhairav",
    prahar: "MORNING",
    timeLabel: "Sunrise",
    mood: "Devotional, majestic",
    importance: "A foundational morning raga with ancient dignity.",
    description:
      "Traditionally sung at sunrise, carrying temple-like calm strength.",
  },
  {
    name: "Todi",
    prahar: "MORNING",
    timeLabel: "Late Morning",
    mood: "Emotional, introspective",
    importance: "A major classical raga expressing longing and depth.",
    description:
      "A late-morning raga known for emotional richness and complexity.",
  },
  {
    name: "Ahir Bhairav",
    prahar: "MORNING",
    timeLabel: "Early Morning",
    mood: "Serene, devotional",
    importance: "A gentle morning raga loved for its soothing nature.",
    description:
      "Blends sweetness and seriousness beautifully.",
  },
  {
    name: "Bhairavi",
    prahar: "MORNING",
    timeLabel: "Morning",
    mood: "Emotional, devotional",
    importance: "Often sung at the end of concerts; widely used in film music.",
    description:
      "Very accessible and emotionally expressive.",
  },
  {
    name: "Nat Bhairav",
    prahar: "MORNING",
    timeLabel: "Morning",
    mood: "Bold, powerful",
    importance: "A dramatic and strong classical raga.",
    description:
      "Blends strength with depth.",
  },
  {
    name: "Bhimpalasi",
    prahar: "AFTERNOON",
    timeLabel: "Afternoon",
    mood: "Romantic longing",
    importance: "Very expressive; widely used in ghazals and film songs.",
    description:
      "Captures emotional yearning beautifully.",
  },
  {
    name: "Malhar",
    prahar: "AFTERNOON",
    timeLabel: "Late Afternoon (Monsoon)",
    mood: "Joyful, refreshing",
    importance: "Associated with rain; legendary monsoon raga family.",
    description:
      "Said to evoke rainfall in folklore.",
  },
  {
    name: "Megh",
    prahar: "AFTERNOON",
    timeLabel: "Monsoon",
    mood: "Magical, peaceful",
    importance: "Another rain raga symbolizing gathering clouds.",
    description:
      "Creates a soothing monsoon atmosphere.",
  },
  {
    name: "Brindavani Sarang",
    prahar: "AFTERNOON",
    timeLabel: "Afternoon",
    mood: "Light, romantic",
    importance: "Associated with Krishna and pastoral beauty.",
    description:
      "Sweet and accessible in nature.",
  },
  {
    name: "Kedar",
    prahar: "NIGHT",
    timeLabel: "Night",
    mood: "Peaceful, devotional",
    importance: "A luminous and spiritually uplifting raga.",
    description:
      "Popular in classical concerts for its glowing character.",
  },
  {
    name: "Yaman",
    prahar: "EVENING",
    timeLabel: "Early Night",
    mood: "Romantic, expansive",
    importance: "One of the most important beginner ragas.",
    description:
      "Graceful and emotionally uplifting.",
  },
  {
    name: "Yaman Kalyan",
    prahar: "EVENING",
    timeLabel: "Evening",
    mood: "Romantic, graceful",
    importance: "A sweeter variation of Yaman.",
    description:
      "Elegant and expressive.",
  },
  {
    name: "Bhoopali",
    prahar: "EVENING",
    timeLabel: "Evening",
    mood: "Uplifting, devotional",
    importance: "Pentatonic and very accessible.",
    description:
      "Popular in classical and film music.",
  },
  {
    name: "Marwa",
    prahar: "EVENING",
    timeLabel: "Sunset",
    mood: "Intense, restless",
    importance: "Captures tension of day turning into night.",
    description:
      "Emotionally powerful and serious.",
  },
  {
    name: "Purvi",
    prahar: "EVENING",
    timeLabel: "Sunset / Early Night",
    mood: "Deep, serious",
    importance: "Complex raga with strong classical identity.",
    description:
      "Rich and introspective.",
  },
  {
    name: "Shivranjani",
    prahar: "EVENING",
    timeLabel: "Evening / Night",
    mood: "Sad, longing",
    importance: "Popular in film music for heartbreak themes.",
    description:
      "Emotionally touching and simple.",
  },
  {
    name: "Darbari Kanada",
    prahar: "NIGHT",
    timeLabel: "Late Night",
    mood: "Deep sorrow, majestic",
    importance: "Associated with royal courts and gravitas.",
    description:
      "Profound and introspective.",
  },
  {
    name: "Bageshri",
    prahar: "NIGHT",
    timeLabel: "Late Night",
    mood: "Romantic longing",
    importance: "Very expressive in vocal music.",
    description:
      "Gentle yet emotionally deep.",
  },
  {
    name: "Jaijaiwanti",
    prahar: "NIGHT",
    timeLabel: "Night",
    mood: "Sweet romance",
    importance: "Blends joy and longing beautifully.",
    description:
      "Delicate and emotional.",
  },
  {
    name: "Khamaj",
    prahar: "NIGHT",
    timeLabel: "Late Evening",
    mood: "Playful, romantic",
    importance: "Common in thumri and light classical music.",
    description:
      "Graceful and expressive.",
  },
  {
    name: "Hamsadhwani",
    prahar: "EVENING",
    timeLabel: "Evening",
    mood: "Energetic, devotional",
    importance: "Often used to open performances.",
    description:
      "Bright and joyful.",
  },
  {
    name: "Durga",
    prahar: "EVENING",
    timeLabel: "Evening / Night",
    mood: "Strong, devotional",
    importance: "Pentatonic and bold.",
    description:
      "Associated with divine feminine strength.",
  },
  {
    name: "Nand",
    prahar: "NIGHT",
    timeLabel: "Night",
    mood: "Serene, romantic",
    importance: "Graceful and luminous.",
    description:
      "Elegant and emotionally rich.",
  },
];
