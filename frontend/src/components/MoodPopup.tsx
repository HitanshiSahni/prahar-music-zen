import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface MoodPopupProps {
  open: boolean;
  onClose: () => void;
  onSelect: (data: {
    mood: string | null;
    genres: string[];
    languages: string[];
  }) => void;
}

const moods = [
  { emoji: "😌", label: "Calm", color: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/40" },
  { emoji: "❤️", label: "Romantic", color: "from-pink-500/20 to-red-500/20", border: "border-pink-500/40" },
  { emoji: "🧠", label: "Focused", color: "from-purple-500/20 to-indigo-500/20", border: "border-purple-500/40" },
  { emoji: "⚡", label: "Energetic", color: "from-yellow-500/20 to-orange-500/20", border: "border-yellow-500/40" },
  { emoji: "😢", label: "Sad", color: "from-blue-500/20 to-slate-500/20", border: "border-blue-500/40" },
  { emoji: "😨", label: "Anxious", color: "from-gray-500/20 to-slate-500/20", border: "border-gray-500/40" },
];

const GENRES = ["Classical", "Semi-Classical", "Bollywood", "Devotional"];
const LANGUAGES = ["Hindi", "English", "Tamil", "Telugu", "Marathi"];

const MoodPopup = ({ open, onClose, onSelect }: MoodPopupProps) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(["Semi-Classical"]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["Hindi"]);

  const toggleItem = (
    value: string,
    list: string[],
    setter: (v: string[]) => void
  ) => {
    setter(
      list.includes(value)
        ? list.filter((i) => i !== value)
        : [...list, value]
    );
  };

  const handleContinue = () => {
    onSelect({
      mood: selectedMood,
      genres: selectedGenres,
      languages: selectedLanguages,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="glass-strong border-border/30 rounded-3xl max-w-lg p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-muted/50 transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-2xl font-playfair text-gradient">
            Personalize your music
          </DialogTitle>
          <p className="text-muted-foreground text-sm mt-2">
            Mood is optional — preferences help us refine
          </p>
        </DialogHeader>

        {/* MOOD */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Your mood (optional)</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(mood.label)}
                className={`
                  p-4 rounded-2xl border transition-all duration-300
                  bg-gradient-to-br ${mood.color} ${mood.border}
                  hover:scale-105
                  ${selectedMood === mood.label ? "ring-2 ring-primary scale-105" : ""}
                `}
              >
                <span className="text-2xl block">{mood.emoji}</span>
                <span className="text-sm">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* GENRES */}
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Genres</h4>
          <div className="flex flex-wrap gap-2">
            {GENRES.map((g) => (
              <button
                key={g}
                onClick={() => toggleItem(g, selectedGenres, setSelectedGenres)}
                className={`px-3 py-1 rounded-full text-sm border
                  ${selectedGenres.includes(g)
                    ? "bg-primary/20 border-primary"
                    : "border-border/40 text-muted-foreground"}
                `}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* LANGUAGES */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Languages</h4>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((l) => (
              <button
                key={l}
                onClick={() =>
                  toggleItem(l, selectedLanguages, setSelectedLanguages)
                }
                className={`px-3 py-1 rounded-full text-sm border
                  ${selectedLanguages.includes(l)
                    ? "bg-primary/20 border-primary"
                    : "border-border/40 text-muted-foreground"}
                `}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <Button className="w-full" onClick={handleContinue}>
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MoodPopup;
