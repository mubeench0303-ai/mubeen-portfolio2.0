"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { BannerType } from "@/lib/events";
import { sfx } from "@/lib/audio";

type Banner = { type: BannerType; text?: string } | null;

export default function GameBanner() {
  const [banner, setBanner] = useState<Banner>(null);

  useEffect(() => {
    const onBanner = (e: Event) => {
      const detail = (e as CustomEvent).detail as {
        type: BannerType;
        text?: string;
      };
      setBanner(detail);
      if (detail.type === "wasted") {
        sfx.wasted();
        document.documentElement.classList.add("wasted-fx");
      } else {
        sfx.passed();
      }
      setTimeout(() => {
        setBanner(null);
        document.documentElement.classList.remove("wasted-fx");
      }, 3200);
    };
    window.addEventListener("gta:banner", onBanner as EventListener);
    return () =>
      window.removeEventListener("gta:banner", onBanner as EventListener);
  }, []);

  const isWasted = banner?.type === "wasted";

  return (
    <AnimatePresence>
      {banner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[97] flex items-center justify-center"
        >
          {/* darken band */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-x-0 h-48 bg-gradient-to-r from-transparent via-black/85 to-transparent"
          />
          <motion.div
            initial={{ scale: 1.4, opacity: 0, letterSpacing: "0.5em" }}
            animate={{ scale: 1, opacity: 1, letterSpacing: "0.05em" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative text-center"
          >
            {banner.text && (
              <p className="hud-label mb-1 text-white/70">{banner.text}</p>
            )}
            <h2
              className={`gta-title text-6xl italic sm:text-8xl md:text-9xl ${
                isWasted ? "text-[#c0392b]" : "text-[#e8c547]"
              }`}
              style={{
                textShadow: isWasted
                  ? "0 0 30px rgba(192,57,43,0.6)"
                  : "0 0 30px rgba(232,197,71,0.6)",
              }}
            >
              {isWasted ? "WASTED" : "MISSION PASSED"}
            </h2>
            {!isWasted && (
              <p className="mt-2 font-mono text-sm uppercase tracking-[0.3em] text-gta-green">
                ★ Respect +100 ★
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
