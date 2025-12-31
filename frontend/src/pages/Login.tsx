import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import FloatingNotes from "@/components/FloatingNotes";
import { useClerk, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { openSignIn, openSignUp } = useClerk();
  const { isSignedIn, isLoaded } = useUser();

  // ⏳ Wait for Clerk to load
  if (!isLoaded) {
    return null;
  }

  // ✅ If already logged in → go to dashboard
  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-pink-glow/10 rounded-full blur-3xl" />

      <FloatingNotes />

      <div className="relative z-10 glass-strong rounded-3xl p-8 md:p-12 w-full max-w-md mx-4 animate-scale-in">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-pink-glow flex items-center justify-center mb-6 glow-cyan animate-pulse-glow">
            <Music className="w-10 h-10 text-background" />
          </div>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gradient mb-3">
            Prahar
          </h1>
          <p className="text-muted-foreground text-center text-sm md:text-base">
            Align your music with time and emotion
          </p>
        </div>

        <div className="space-y-4">
          {/* SIGN IN */}
          <Button
            variant="glass"
            size="xl"
            className="w-full"
            onClick={() => openSignIn({ redirectUrl: "/dashboard" })}
          >
            Continue with Google
          </Button>

          {/* SIGN UP */}
          <Button
            variant="glow"
            size="xl"
            className="w-full"
            onClick={() => openSignUp({ redirectUrl: "/dashboard" })}
          >
            Continue with Email
          </Button>
        </div>

        <p className="text-muted-foreground text-xs text-center mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
