import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import AppSidebar from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import MoodPopup from "@/components/MoodPopup";
import RaagaPlayer from "@/components/RaagaPlayer";
import PraharTimeline from "@/components/PraharTimeline";
import Analytics from "@/components/Analytics";
import FloatingNotes from "@/components/FloatingNotes";

import {
  fetchRecommendation,
  RecommendResponse,
} from "@/lib/api";

/* ---------------- DASHBOARD HOME ---------------- */

const DashboardHome = ({
  currentPrahar,
}: {
  currentPrahar: string | null;
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <RaagaPlayer />
      </div>

      <div>
        <PraharTimeline currentPrahar={currentPrahar} />
      </div>

      <div className="lg:col-span-3">
        <Analytics />
      </div>
    </div>
  );
};

/* ---------------- MAIN DASHBOARD ---------------- */

const Dashboard = () => {
  const [showMoodPopup, setShowMoodPopup] = useState(() => {
    return !sessionStorage.getItem("hasSeenMoodPopup");
  });

  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [recommendation, setRecommendation] =
    useState<RecommendResponse | null>(null);

  const [currentTime, setCurrentTime] = useState<string>("");

  const location = useLocation();
  const isMainDashboard = location.pathname === "/dashboard";

  /* ---------- INITIAL LOAD (NO MOOD) ---------- */
  useEffect(() => {
    const now = new Date();

    const istTime = now.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    setCurrentTime(istTime);

    const fetchInitial = async () => {
      try {
        const response = await fetchRecommendation({
          mood: "", // mood optional
          genre: "Semi-Classical",
          language: "Hindi",
          timestamp: now.toISOString(),
        });

        console.log("INITIAL PRAHAR →", response.prahar);
        setRecommendation(response);
      } catch (err) {
        console.error("Initial recommendation failed", err);
      }
    };

    fetchInitial();
  }, []);

  /* ---------- MOOD SELECT ---------- */
  const handleMoodSelect = async (data: {
    mood: string | null;
    genres: string[];
    languages: string[];
  }) => {
    setSelectedMood(data.mood);
    setShowMoodPopup(false);
    sessionStorage.setItem("hasSeenMoodPopup", "true");

    const now = new Date();

    const istTime = now.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    setCurrentTime(istTime);

    const response = await fetchRecommendation({
      mood: data.mood ?? "",
      genre: data.genres[0],      // backend-ready
      language: data.languages[0],
      timestamp: now.toISOString(),
    });

    console.log("MOOD PRAHAR →", response.prahar);
    setRecommendation(response);
  };

  const handleMoodClose = () => {
    setShowMoodPopup(false);
    sessionStorage.setItem("hasSeenMoodPopup", "true");
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className="min-h-screen relative">
      <FloatingNotes />
      <AppSidebar />

      <div className="md:ml-64 transition-all duration-300">
        <TopBar />

        <main className="p-4 md:p-6 pb-24 md:pb-6">
          {/* Time */}
          {currentTime && (
            <div className="mb-1 text-xs text-muted-foreground">
              Time (IST): {currentTime}
            </div>
          )}

          {/* Mood */}
          {selectedMood && (
            <div className="mb-2 text-sm">
              Mood:{" "}
              <span className="text-primary font-medium">
                {selectedMood}
              </span>
            </div>
          )}

          {/* Prahar */}
          {recommendation && (
            <div className="mb-2 text-sm">
              Prahar:{" "}
              <span className="text-primary font-medium">
                {recommendation.prahar}
              </span>
            </div>
          )}

          {/* Raaga Recommendation */}
          {recommendation && (
            <div className="mb-6 glass p-4 rounded-xl border border-primary/30">
              <p className="text-sm text-muted-foreground">
                Recommended for you
              </p>
              <p className="text-lg font-semibold text-primary">
                Raaga {recommendation.raaga}
              </p>
              <p className="text-sm text-muted-foreground">
                {recommendation.tempo}
              </p>
            </div>
          )}

          {/* Main Content */}
          {isMainDashboard ? (
            <DashboardHome
              currentPrahar={recommendation?.prahar ?? null}
            />
          ) : (
            <Outlet />
          )}
        </main>
      </div>

      <MoodPopup
        open={showMoodPopup}
        onClose={handleMoodClose}
        onSelect={handleMoodSelect}
      />
    </div>
  );
};

export default Dashboard;
