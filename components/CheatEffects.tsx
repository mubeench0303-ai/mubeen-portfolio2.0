"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CheatEffect } from "@/lib/events";

type Burst = { id: number; effect: CheatEffect };

const CONFETTI_COLORS = ["#ff2e93", "#3be8ff", "#ffd400", "#a5f70a", "#8a2be2"];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function CheatEffects() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const onCheat = (e: Event) => {
      const { effect } = (e as CustomEvent).detail as { effect: CheatEffect };
      if (effect !== "money" && effect !== "confetti") return;
      const id = Date.now();
      setBursts((b) => [...b, { id, effect }]);
      setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 4200);
    };
    window.addEventListener("gta:cheat", onCheat as EventListener);
    return () => window.removeEventListener("gta:cheat", onCheat as EventListener);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[85] overflow-hidden">
      <AnimatePresence>
        {bursts.map((burst) =>
          Array.from({ length: 55 }).map((_, i) => {
            const left = rand(0, 100);
            const delay = rand(0, 1.2);
            const dur = rand(2.4, 3.8);
            const size = burst.effect === "money" ? rand(20, 34) : rand(8, 14);
            const color =
              CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
            return (
              <motion.div
                key={`${burst.id}-${i}`}
                initial={{ y: -60, opacity: 0, rotate: 0 }}
                animate={{
                  y: "110vh",
                  opacity: [0, 1, 1, 0.8],
                  rotate: rand(-360, 360),
                }}
                transition={{ duration: dur, delay, ease: "easeIn" }}
                className="absolute top-0"
                style={{ left: `${left}%` }}
              >
                {burst.effect === "money" ? (
                  <span
                    className="font-mono font-bold"
                    style={{ fontSize: size, color: "#a5f70a", textShadow: "0 0 8px rgba(165,247,10,0.7)" }}
                  >
                    $
                  </span>
                ) : (
                  <span
                    style={{
                      display: "block",
                      width: size,
                      height: size * 0.5,
                      background: color,
                      borderRadius: 2,
                    }}
                  />
                )}
              </motion.div>
            );
          })
        )}
      </AnimatePresence>
    </div>
  );
}
