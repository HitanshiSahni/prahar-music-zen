import { Search, Play, Pause, SkipForward } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";

const TopBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useUser();

  return (
    <header className="glass-strong border-b border-border/30 px-4 md:px-6 py-4 flex items-center justify-between gap-4">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search raaga, mood, frequency…"
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Mini Player Controls */}
      <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/30">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-full"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-primary" />
          ) : (
            <Play className="w-4 h-4 text-primary" />
          )}
        </Button>
        <div className="w-24 h-1 rounded-full bg-muted overflow-hidden">
          <div className="w-1/3 h-full bg-gradient-to-r from-primary to-pink-glow rounded-full" />
        </div>
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
          <SkipForward className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>

      {/* User Info + Avatar */}
      <div className="flex items-center gap-3">
        {user && (
          <span className="hidden md:block text-sm text-muted-foreground">
            Hi,{" "}
            <span className="text-primary font-medium">
              {user.firstName || user.username}
            </span>
          </span>
        )}

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox:
                "w-10 h-10 border border-border/30 hover:border-primary/50 transition-all",
            },
          }}
        />
      </div>
    </header>
  );
};

export default TopBar;
