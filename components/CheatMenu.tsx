"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Terminal, X, Keyboard, MousePointerClick } from "lucide-react";
import { cheats } from "@/lib/cheats";
import { sfx } from "@/lib/audio";
import { popOverlay, pushOverlay } from "@/lib/gameStore";

export default function CheatMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    pushOverlay();
    return () => popOverlay();
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="focus-ring fixed left-4 top-[13.5rem] z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-black/60 text-white backdrop-blur transition-colors hover:border-gta-green"
        aria-label="Show cheat codes"
        title="Cheat codes"
      >
        <Terminal size={18} className="text-gta-green" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[96] flex items-center justify-center bg-black/75 p-4 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="hud-panel relative w-full max-w-md overflow-hidden rounded-2xl"
            >
              <div className="gta-stripes h-1.5 w-full" />
              <div className="p-6">
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal size={18} className="text-gta-green" />
                    <h3 className="gta-title text-2xl text-white">CHEAT CODES</h3>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="focus-ring text-muted transition-colors hover:text-white"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Keyboard size={12} /> Type the code
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MousePointerClick size={12} /> or tap to activate
                  </span>
                </p>

                <div className="space-y-2">
                  {cheats.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        sfx.cheat();
                        setOpen(false);
                        // let the menu close first so the effect is visible
                        setTimeout(() => c.run(), 280);
                      }}
                      className="focus-ring flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-left transition-colors hover:border-gta-green hover:bg-gta-green/10"
                    >
                      <span className="rounded bg-black/60 px-2.5 py-1 font-mono text-sm font-bold tracking-widest text-gta-green">
                        {c.code}
                      </span>
                      <span className="ml-3 font-mono text-xs text-white/70">
                        {c.desc}
                      </span>
                    </button>
                  ))}
                </div>

                <p className="mt-4 border-t border-white/10 pt-3 font-mono text-[10px] uppercase tracking-widest text-muted">
                  Pro tip: hold TAB for the weapon-wheel menu
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
