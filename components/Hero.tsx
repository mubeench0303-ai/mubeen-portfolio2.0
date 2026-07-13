"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { profile } from "@/lib/data";

export default function Hero() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="hud-label mb-5 text-gta-cyan"
      >
        ★ Welcome to {profile.location} ★
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="gta-title text-6xl leading-[0.85] text-white sm:text-8xl md:text-[10rem]"
      >
        <span className="block neon-pink">{profile.name.split(" ")[0]}</span>
        <span className="block neon-cyan">
          {profile.name.split(" ").slice(1).join(" ") || "DEVELOPER"}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 max-w-xl font-mono text-sm text-muted sm:text-base"
      >
        {profile.role} — {profile.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-4"
      >
        <button
          onClick={() => go("missions")}
          className="focus-ring hud-chip bg-gta-pink px-8 py-3 font-mono text-sm font-bold uppercase tracking-widest text-white transition-colors transition-transform hover:scale-105 hover:bg-gta-cyan"
        >
          Start Game
        </button>
        <button
          onClick={() => go("contact")}
          className="focus-ring hud-chip border border-white/25 bg-black/40 px-8 py-3 font-mono text-sm font-bold uppercase tracking-widest text-white backdrop-blur transition-transform hover:scale-105"
        >
          Contact
        </button>
      </motion.div>

      <motion.button
        onClick={() => go("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
      >
        Press to continue
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
        >
          <ChevronDown className="text-gta-yellow" size={22} />
        </motion.span>
      </motion.button>
    </section>
  );
}
