"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sfx } from "@/lib/audio";
import { getState } from "@/lib/gameStore";

type Shot = { id: number; x: number; y: number; angles: number[] };

export default function BulletShots() {
  const [shots, setShots] = useState<Shot[]>([]);

  useEffect(() => {
    // desktop only (matches the aiming crosshair)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      // skip when a menu/modal is open (normal cursor there)
      if (getState().overlays > 0) return;

      const id = performance.now() + Math.random();
      const angles = Array.from({ length: 6 }, (_, i) => (i / 6) * 360 + Math.random() * 25);
      setShots((s) => [...s, { id, x: e.clientX, y: e.clientY, angles }]);
      window.dispatchEvent(new CustomEvent("gta:shot"));
      sfx.shot();
      setTimeout(() => setShots((s) => s.filter((x) => x.id !== id)), 1000);
    };

    window.addEventListener("pointerdown", onDown, true);
    return () => window.removeEventListener("pointerdown", onDown, true);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[92] overflow-hidden">
      <AnimatePresence>
        {shots.map((shot) => (
          <div
            key={shot.id}
            className="absolute"
            style={{ left: shot.x, top: shot.y }}
          >
            {/* muzzle flash */}
            <motion.div
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 2.4, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                width: 40,
                height: 40,
                borderRadius: "9999px",
                background:
                  "radial-gradient(circle, #ffffff 0%, #ffd400 45%, rgba(255,122,0,0.4) 70%, transparent 75%)",
              }}
            />
            {/* impact ring */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0.9 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gta-yellow"
              style={{ width: 44, height: 44 }}
            />
            {/* sparks */}
            {shot.angles.map((a, i) => (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((a * Math.PI) / 180) * (24 + Math.random() * 16),
                  y: Math.sin((a * Math.PI) / 180) * (24 + Math.random() * 16),
                  opacity: 0,
                }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-gta-yellow"
                style={{ width: 3, height: 3, boxShadow: "0 0 6px #ffd400" }}
              />
            ))}
            {/* lingering bullet hole */}
            <motion.div
              initial={{ opacity: 0.85, scale: 0.6 }}
              animate={{ opacity: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 12,
                height: 12,
                background:
                  "radial-gradient(circle, #000 0%, #111 45%, rgba(0,0,0,0.4) 70%, transparent 72%)",
                boxShadow: "0 0 3px rgba(0,0,0,0.8)",
              }}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
