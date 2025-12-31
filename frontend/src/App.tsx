import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/clerk-react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PlayerPage from "./pages/PlayerPage";
import TimelinePage from "./pages/TimelinePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import MoodBoardPage from "./pages/MoodBoardPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* ⏳ Wait for Clerk to load */}
      <ClerkLoading>
        <div className="min-h-screen flex items-center justify-center text-muted-foreground">
          Loading...
        </div>
      </ClerkLoading>

      <ClerkLoaded>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Login />} />

          {/* PROTECTED DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <>
                <SignedIn>
                  <Dashboard />
                </SignedIn>

                <SignedOut>
                  <Navigate to="/" replace />
                </SignedOut>
              </>
            }
          >
            <Route path="mood" element={<MoodBoardPage />} />
            <Route path="player" element={<PlayerPage />} />
            <Route path="timeline" element={<TimelinePage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* FALLBACK */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ClerkLoaded>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
