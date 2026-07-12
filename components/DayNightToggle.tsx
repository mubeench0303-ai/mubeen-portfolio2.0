"use client";

import { Moon, Sunset } from "lucide-react";
import { toggleTimeOfDay, useGameStore } from "@/lib/gameStore";

export default function DayNightToggle() {
  const { timeOfDay } = useGameStore();
  const isNight = timeOfDay === "night";

  return (
    <button
      onClick={toggleTimeOfDay}
      className="focus-ring fixed left-4 top-40 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-black/60 text-white backdrop-blur transition-colors hover:border-gta-yellow"
      aria-label="Toggle day / night"
      title={isNight ? "Night — switch to sunset" : "Sunset — switch to night"}
    >
      {isNight ? (
        <Moon size={18} className="text-gta-cyan" />
      ) : (
        <Sunset size={18} className="text-gta-orange" />
      )}
    </button>
  );
}
