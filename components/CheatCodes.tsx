"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { cheats } from "@/lib/cheats";
import { sfx } from "@/lib/audio";

export default function CheatCodes() {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let buffer = "";
    let hideTimer: ReturnType<typeof setTimeout>;

    const onKey = (e: KeyboardEvent) => {
      // ignore while typing in a field (e.g. the hacking mini-game)
      const ae = document.activeElement as HTMLElement | null;
      if (ae && (ae.tagName === "INPUT" || ae.tagName === "TEXTAREA" || ae.isContentEditable))
        return;
      if (e.key.length !== 1 || !/[a-zA-Z]/.test(e.key)) return;
      buffer = (buffer + e.key.toUpperCase()).slice(-12);
      const hit = cheats.find((c) => buffer.endsWith(c.code));
      if (hit) {
        buffer = "";
        hit.run();
        sfx.cheat();
        setToast(`${hit.label} · ${hit.desc}`);
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => setToast(null), 2600);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed left-1/2 top-20 z-[95] flex -translate-x-1/2 items-center gap-2 rounded-lg border border-gta-green/50 bg-black/85 px-5 py-2.5 backdrop-blur"
        >
          <Terminal size={16} className="text-gta-green" />
          <span className="font-mono text-sm font-bold uppercase tracking-widest text-gta-green">
            {toast}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
