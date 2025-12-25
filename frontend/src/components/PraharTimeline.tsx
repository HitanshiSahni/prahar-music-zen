import { Sun, Moon, Sunrise, Sunset } from "lucide-react";

type Props = {
  currentPrahar: string | null;
};

const prahars = [
  {
    icon: Sunrise,
    label: "Morning",
    time: "6 AM - 12 PM",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Sun,
    label: "Afternoon",
    time: "12 PM - 6 PM",
    color: "from-yellow-400 to-amber-500",
  },
  {
    icon: Sunset,
    label: "Evening",
    time: "6 PM - 12 AM",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Moon,
    label: "Night",
    time: "12 AM - 6 AM",
    color: "from-indigo-500 to-purple-600",
  },
];

const PraharTimeline = ({ currentPrahar }: Props) => {
  return (
    <div className="glass-strong rounded-3xl p-6 md:p-8">
      <h3 className="text-lg font-semibold text-center mb-6">
        Prahar Timeline
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {prahars.map((prahar) => {
          const Icon = prahar.icon;
          const isActive = currentPrahar === prahar.label;

          return (
            <div
              key={prahar.label}
              className={`p-4 rounded-2xl border transition-all duration-300
                ${
                  isActive
                    ? "border-primary bg-primary/20 shadow-[0_0_25px_rgba(56,189,248,0.6)] scale-[1.03]"
                    : "border-border/30 bg-muted/10 opacity-70"
                }
              `}
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${prahar.color}
                flex items-center justify-center mb-3`}
              >
                <Icon className="w-5 h-5 text-background" />
              </div>

              <h4 className="font-medium text-sm">{prahar.label}</h4>
              <p className="text-xs text-muted-foreground">
                {prahar.time}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PraharTimeline;
