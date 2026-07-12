"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Github, Star } from "lucide-react";
import { missions, type Mission } from "@/lib/data";
import { showBanner } from "@/lib/events";
import { popOverlay, pushOverlay } from "@/lib/gameStore";

export default function MissionModal() {
  const [mission, setMission] = useState<Mission | null>(null);

  useEffect(() => {
    const onMission = (e: Event) => {
      const id = (e as CustomEvent).detail as string;
      const m = missions.find((x) => x.id === id);
      if (m) setMission(m);
    };
    window.addEventListener("gta:mission", onMission as EventListener);
    return () =>
      window.removeEventListener("gta:mission", onMission as EventListener);
  }, []);

  useEffect(() => {
    if (!mission) return;
    pushOverlay();
    return () => popOverlay();
  }, [mission]);

  const close = () => setMission(null);

  return (
    <AnimatePresence>
      {mission && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 z-[96] flex items-center justify-center bg-black/75 p-4 backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="hud-panel relative w-full max-w-lg overflow-hidden rounded-2xl p-7"
          >
            <div className="gta-stripes absolute inset-x-0 top-0 h-1.5" />
            <button
              onClick={close}
              className="focus-ring absolute right-4 top-4 text-muted transition-colors hover:text-white"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <p className="hud-label text-gta-cyan">{mission.code} · MISSION BRIEF</p>
            <h3 className="gta-title mt-1 text-4xl text-white">{mission.name}</h3>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={13}
                    className={
                      s < mission.difficulty
                        ? "fill-gta-yellow text-gta-yellow"
                        : "text-white/20"
                    }
                  />
                ))}
              </div>
              <span className="font-mono text-sm font-bold text-gta-green">
                {mission.reward}
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-white/80">
              {mission.brief}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {mission.tags.map((t) => (
                <span
                  key={t}
                  className="rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={mission.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring hud-chip flex items-center gap-2 bg-gta-cyan px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-black transition-transform hover:scale-105"
              >
                <ExternalLink size={14} /> Live
              </a>
              <a
                href={mission.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring hud-chip flex items-center gap-2 border border-white/25 bg-black/40 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-white transition-transform hover:scale-105"
              >
                <Github size={14} /> Code
              </a>
              <button
                onClick={() => {
                  showBanner("passed", mission.name);
                  close();
                }}
                className="focus-ring ml-auto font-mono text-[11px] uppercase tracking-widest text-gta-green hover:text-white"
              >
                Complete ✓
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
