"use client";

import { useEffect, useRef } from "react";
import { Volume2, VolumeX, Music, Music2 } from "lucide-react";
import { initAudio, sfx } from "@/lib/audio";
import { setMusic, setSfx, useGameStore } from "@/lib/gameStore";

export default function SoundControls() {
  const { sfxOn, musicOn } = useGameStore();
  const lastHover = useRef<Element | null>(null);

  useEffect(() => {
    initAudio();

    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement)?.closest("a,button");
      if (el && el !== lastHover.current) {
        lastHover.current = el;
        sfx.hover();
      }
    };
    const onClick = (e: Event) => {
      const el = (e.target as HTMLElement)?.closest("a,button");
      if (el) sfx.click();
    };

    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return (
    <div className="fixed left-4 top-16 z-40 flex flex-col gap-2">
      <button
        onClick={() => setSfx(!sfxOn)}
        className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-black/60 text-white backdrop-blur transition-colors hover:border-gta-cyan"
        aria-label="Toggle sound effects"
        title="Sound FX"
      >
        {sfxOn ? (
          <Volume2 size={18} className="text-gta-cyan" />
        ) : (
          <VolumeX size={18} className="text-muted" />
        )}
      </button>
      <button
        onClick={() => setMusic(!musicOn)}
        className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-black/60 text-white backdrop-blur transition-colors hover:border-gta-pink"
        aria-label="Toggle music"
        title="Synthwave music"
      >
        {musicOn ? (
          <Music size={18} className="text-gta-pink animate-pulseGlow" />
        ) : (
          <Music2 size={18} className="text-muted" />
        )}
      </button>
    </div>
  );
}
