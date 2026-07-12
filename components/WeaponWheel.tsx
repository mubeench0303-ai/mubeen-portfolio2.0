"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crosshair as CrosshairIcon } from "lucide-react";
import { navItems } from "@/lib/data";
import { sfx } from "@/lib/audio";
import { popOverlay, pushOverlay } from "@/lib/gameStore";

const RADIUS = 150;

export default function WeaponWheel() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const openRef = useRef(false);
  const activeRef = useRef(0);

  const setOpenState = (v: boolean) => {
    openRef.current = v;
    setOpen(v);
    if (v) sfx.open();
  };

  const select = useCallback((i: number) => {
    const item = navItems[i];
    if (!item) return;
    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
    sfx.select();
  }, []);

  const close = useCallback(
    (commit: boolean) => {
      if (!openRef.current) return;
      setOpenState(false);
      if (commit) select(activeRef.current);
    },
    [select]
  );

  useEffect(() => {
    if (!open) return;
    pushOverlay();
    return () => popOverlay();
  }, [open]);

  // keyboard: hold Tab
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const ae = document.activeElement as HTMLElement | null;
      const typing =
        ae && (ae.tagName === "INPUT" || ae.tagName === "TEXTAREA" || ae.isContentEditable);
      if (typing) return;
      if (e.key === "Tab" && !e.repeat) {
        e.preventDefault();
        setOpenState(true);
      }
      if (e.key === "Escape") close(false);
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        close(true);
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [close]);

  // pointer direction picks segment while open
  useEffect(() => {
    if (!open) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const move = (e: PointerEvent) => {
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      if (Math.hypot(dx, dy) < 30) return;
      // angle from top, clockwise
      let ang = Math.atan2(dx, -dy);
      if (ang < 0) ang += Math.PI * 2;
      const idx = Math.round((ang / (Math.PI * 2)) * navItems.length) % navItems.length;
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
        sfx.hover();
      }
    };
    const up = () => close(true);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [open, close]);

  return (
    <>
      {/* trigger button (bottom right) */}
      <button
        onPointerDown={(e) => {
          e.preventDefault();
          setOpenState(true);
        }}
        className="focus-ring fixed bottom-5 right-4 z-40 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-white backdrop-blur transition-colors hover:border-gta-yellow"
        aria-label="Open weapon wheel navigation"
      >
        <CrosshairIcon size={14} className="text-gta-yellow" />
        Hold · Wheel
        <kbd className="hidden rounded bg-white/10 px-1.5 py-0.5 text-[9px] md:inline">
          TAB
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="relative"
              style={{ width: RADIUS * 2 + 120, height: RADIUS * 2 + 120 }}
            >
              {/* center hub */}
              <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-white/20 bg-black/70 text-center">
                <span className="hud-label text-gta-yellow">SELECT</span>
                <span className="gta-title mt-1 text-xl text-white">
                  {navItems[active]?.label}
                </span>
              </div>

              {navItems.map((item, i) => {
                const ang = (i / navItems.length) * Math.PI * 2 - Math.PI / 2;
                const x = Math.cos(ang) * RADIUS;
                const y = Math.sin(ang) * RADIUS;
                const isActive = i === active;
                return (
                  <button
                    key={item.id}
                    onPointerEnter={() => {
                      activeRef.current = i;
                      setActive(i);
                    }}
                    onClick={() => close(true)}
                    className={`focus-ring absolute flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-center font-mono text-[11px] uppercase tracking-widest transition-all ${
                      isActive
                        ? "scale-110 border-gta-pink bg-gta-pink/20 text-white shadow-[0_0_25px_rgba(255,46,147,0.6)]"
                        : "border-white/15 bg-black/60 text-muted"
                    }`}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
