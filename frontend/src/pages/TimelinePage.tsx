import { useMemo, useState } from "react";
import PraharTimeline from "@/components/PraharTimeline";
import { RAGA_CATALOG, type Raga } from "../data/ragaCatalog";

type Prahar =
  | "EARLY_MORNING"
  | "MORNING"
  | "AFTERNOON"
  | "EVENING"
  | "NIGHT";

const PRAHAR_LABELS: Record<Prahar, string> = {
  EARLY_MORNING: "🌅 Early Morning",
  MORNING: "🌄 Morning",
  AFTERNOON: "🌞 Afternoon",
  EVENING: "🌆 Evening",
  NIGHT: "🌙 Night",
};

const PRAHAR_ACCENTS: Record<Prahar, string> = {
  EARLY_MORNING: "border-rose-400",
  MORNING: "border-amber-400",
  AFTERNOON: "border-sky-400",
  EVENING: "border-orange-400",
  NIGHT: "border-indigo-400",
};

/* 🌈 Subtle background glow per prahar */
const PRAHAR_BACKGROUNDS: Record<Prahar, string> = {
  EARLY_MORNING:
    "radial-gradient(circle at 20% 20%, rgba(244,114,182,0.12), transparent 55%)",
  MORNING:
    "radial-gradient(circle at 30% 20%, rgba(251,191,36,0.12), transparent 55%)",
  AFTERNOON:
    "radial-gradient(circle at 70% 30%, rgba(56,189,248,0.12), transparent 55%)",
  EVENING:
    "radial-gradient(circle at 60% 40%, rgba(249,115,22,0.14), transparent 60%)",
  NIGHT:
    "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.18), transparent 65%)",
};

const TimelinePage = () => {
  const [selectedRaga, setSelectedRaga] = useState<Raga | null>(null);
  const [search, setSearch] = useState("");

  const filteredRagas = useMemo(() => {
    return RAGA_CATALOG.filter((raga) =>
      raga.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div
      className="min-h-screen text-foreground py-10 px-6 transition-all duration-700 ease-in-out"
      style={{
        backgroundColor: "hsl(var(--background))",
        backgroundImage: selectedRaga
          ? PRAHAR_BACKGROUNDS[selectedRaga.prahar as Prahar]
          : "none",
      }}
    >
      {/* Timeline */}
      <div className="max-w-6xl mx-auto mb-12">
        <PraharTimeline
          currentPrahar={selectedRaga?.prahar ?? null}
          showAllDescriptions
        />
      </div>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* LEFT: Vertical Raga List */}
        <div className="md:col-span-1 space-y-4">

          <h3 className="text-lg font-semibold">Raga Catalogue</h3>

          <input
            type="text"
            placeholder="Search raga..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-muted/20 border border-border/40 
            focus:outline-none focus:ring-1 focus:ring-primary/40 text-sm"
          />

          {/* 🎨 Scoped Dark Scrollbar */}
          <div
            className="space-y-2 max-h-[500px] overflow-y-auto pr-2"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "hsl(var(--muted)) hsl(var(--background))",
            }}
          >
            <style>
              {`
              div::-webkit-scrollbar {
                width: 8px;
              }
              div::-webkit-scrollbar-track {
                background: hsl(var(--background));
              }
              div::-webkit-scrollbar-thumb {
                background: hsl(var(--muted));
                border-radius: 10px;
              }
              div::-webkit-scrollbar-thumb:hover {
                background: hsl(var(--muted-foreground));
              }
            `}
            </style>

            {filteredRagas.map((raga) => {
              const isActive = selectedRaga?.name === raga.name;

              return (
                <button
                  key={raga.name}
                  onClick={() => setSelectedRaga(raga)}
                  className={`w-full text-left px-4 py-3 rounded-xl 
                  border transition-all duration-200 text-sm
                  ${
                    isActive
                      ? `bg-muted/40 ${PRAHAR_ACCENTS[raga.prahar]} border-2`
                      : "bg-muted/10 border-border/30 hover:bg-muted/30"
                  }`}
                >
                  <div className="font-medium">{raga.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {PRAHAR_LABELS[raga.prahar as Prahar]}
                  </div>
                </button>
              );
            })}

            {filteredRagas.length === 0 && (
              <p className="text-xs text-muted-foreground mt-4">
                No ragas found.
              </p>
            )}
          </div>
        </div>

        {/* RIGHT: Raga Details */}
        <div className="md:col-span-2">

          {selectedRaga ? (
            <div className="rounded-3xl p-8 bg-card border border-border/30 shadow-lg transition-all">

              <h2 className="text-3xl font-semibold mb-6">
                {selectedRaga.name}
              </h2>

              <div className="space-y-4 text-sm">

                <p>
                  <span className="font-semibold">Prahar:</span>{" "}
                  {PRAHAR_LABELS[selectedRaga.prahar as Prahar]}
                </p>

                <p>
                  <span className="font-semibold">Mood:</span>{" "}
                  {selectedRaga.mood}
                </p>

                <p>
                  <span className="font-semibold">Why it matters:</span>{" "}
                  {selectedRaga.importance}
                </p>

                <p className="text-muted-foreground pt-4 border-t border-border/20 leading-relaxed">
                  {selectedRaga.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center rounded-3xl 
            border border-dashed border-border/40 text-muted-foreground p-12">
              Select a raga from the list to explore its mood, time and significance.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
