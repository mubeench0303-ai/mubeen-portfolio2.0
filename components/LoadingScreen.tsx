"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/lib/data";

const TIPS = [
  "TIP: HOLD [TAB] to open the weapon-wheel navigation.",
  "TIP: Type HESOYAM anywhere for a little cash drop.",
  "TIP: Type FIESTA to throw some confetti.",
  "TIP: Click a glowing building to open a mission.",
  "TIP: Type NIGHT or SUNSET to change the vibe.",
  "TIP: Full-stack devs ship both the front and the back.",
  "TIP: Clean APIs are like clean getaways — no traces.",
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [tip, setTip] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTip((t) => (t + 1) % TIPS.length), 1900);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cur = 0;
    const id = setInterval(() => {
      cur += Math.random() * 9 + 2;
      if (cur >= 100) {
        cur = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 650);
      }
      setProgress(Math.floor(cur));
    }, 130);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-[#05060a]"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* diagonal color stripes header */}
          <div className="gta-stripes h-3 w-full" />

          {/* animated stripe background art */}
          <div className="absolute inset-0 opacity-[0.07]">
            <div className="gta-stripes h-full w-[200%] animate-marquee" />
          </div>

          <div className="relative flex flex-1 items-center justify-center px-6">
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="hud-label mb-4 text-gta-cyan"
              >
                LOS SANTOS · SAN ANDREAS
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="gta-title text-6xl text-white sm:text-8xl md:text-9xl"
              >
                <span className="neon-pink">DEV</span>{" "}
                <span className="neon-cyan">CITY</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-3 font-mono text-sm uppercase tracking-[0.3em] text-muted"
              >
                {profile.role}
              </motion.p>
            </div>
          </div>

          {/* footer loader */}
          <div className="relative px-6 pb-10 sm:px-12">
            <div className="mb-3 flex items-end justify-between">
              <span className="hud-label text-white">Loading assets…</span>
              <span className="gta-title text-3xl text-gta-yellow">
                {progress}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-gta-pink via-gta-yellow to-gta-cyan"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={tip}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-xs text-gta-cyan"
                >
                  {TIPS[tip]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="gta-stripes h-3 w-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
