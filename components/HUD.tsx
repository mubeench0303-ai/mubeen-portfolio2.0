"use client";

import { useEffect, useRef, useState } from "react";
import { hud, profile } from "@/lib/data";

function useCountUp(target: number, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    let raf = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${filled ? "wanted-star" : ""}`}
      fill={filled ? "#ffd400" : "none"}
      stroke={filled ? "#ffd400" : "#4a5163"}
      strokeWidth={2}
    >
      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 6 21.2l1.4-6.8L2.3 9.7l6.9-.7L12 2z" />
    </svg>
  );
}

function Radar() {
  return (
    <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white/20 bg-[#0a1a2e] shadow-[0_0_20px_rgba(59,232,255,0.3)]">
      {/* grid */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gta-cyan/40" />
        <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-gta-cyan/40" />
      </div>
      {/* sweep */}
      <div
        className="absolute inset-0 animate-radar"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(59,232,255,0.55), transparent 70%)",
        }}
      />
      {/* blips */}
      <span className="absolute left-[30%] top-[35%] h-1.5 w-1.5 rounded-full bg-gta-pink animate-pulseGlow" />
      <span className="absolute left-[62%] top-[58%] h-1.5 w-1.5 rounded-full bg-gta-green animate-pulseGlow" />
      {/* player dot */}
      <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
    </div>
  );
}

export default function HUD() {
  const cash = useCountUp(hud.cash);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-20 hidden select-none md:block"
    >
      {/* top-right: money + wanted */}
      <div className="absolute right-4 top-16 flex flex-col items-end gap-1.5">
        <div className="hud-chip bg-black/70 px-5 py-1.5 backdrop-blur">
          <span className="font-mono text-lg font-bold text-gta-green">
            $ {cash.toLocaleString()}
          </span>
        </div>
        <div className="flex gap-1 pr-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} filled={i < hud.wanted} />
          ))}
        </div>
      </div>

      {/* bottom-left: radar + player tag */}
      <div className="absolute bottom-4 left-4 flex items-end gap-3">
        <Radar />
        <div className="mb-1">
          <p className="font-mono text-[11px] uppercase tracking-widest text-gta-cyan">
            {profile.handle}
          </p>
          <div className="mt-1 h-1.5 w-28 overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-gta-cyan to-gta-green" />
          </div>
          <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-muted">
            LVL 42 · ONLINE
          </p>
        </div>
      </div>
    </div>
  );
}
