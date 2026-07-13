"use client";

import { useEffect, useRef, useState } from "react";
import { useGameStore } from "@/lib/gameStore";

export default function Crosshair() {
  const ref = useRef<HTMLDivElement>(null);
  const [aiming, setAiming] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [recoil, setRecoil] = useState(false);
  const aimingRef = useRef(false);
  const { overlays } = useGameStore();
  const hidden = overlays > 0;

  useEffect(() => {
    // only on precise pointers (desktop)
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    let raf = 0;
    let x = 0;
    let y = 0;
    let queued = false;

    const apply = () => {
      queued = false;
      if (ref.current) {
        // translate3d = GPU compositing, no reflow → smooth cursor
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!queued) {
        queued = true;
        raf = requestAnimationFrame(apply);
      }
    };

    const interactiveSel =
      "a,button,input,textarea,select,[role='button'],[data-cursor='aim']";
    const onOver = (e: PointerEvent) => {
      const overUI = !!(e.target as HTMLElement)?.closest(interactiveSel);
      if (overUI !== aimingRef.current) {
        aimingRef.current = overUI;
        setAiming(overUI);
      }
    };
    const onOut = (e: PointerEvent) => {
      const fromUI = !!(e.target as HTMLElement)?.closest(interactiveSel);
      const toUI =
        !!(e.relatedTarget as HTMLElement | null)?.closest?.(interactiveSel);
      if (fromUI && !toUI && aimingRef.current) {
        aimingRef.current = false;
        setAiming(false);
      }
    };
    const onAim = (e: Event) => {
      const v = (e as CustomEvent).detail || false;
      if (v !== aimingRef.current) {
        aimingRef.current = v;
        setAiming(v);
      }
    };

    let recoilTimer: ReturnType<typeof setTimeout>;
    const onShot = () => {
      setRecoil(true);
      clearTimeout(recoilTimer);
      recoilTimer = setTimeout(() => setRecoil(false), 110);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("gta:aim", onAim as EventListener);
    window.addEventListener("gta:shot", onShot);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("gta:aim", onAim as EventListener);
      window.removeEventListener("gta:shot", onShot);
      cancelAnimationFrame(raf);
      clearTimeout(recoilTimer);
      document.body.classList.remove("cursor-none");
    };
  }, []);

  // hide the custom crosshair (and bring back the normal cursor) whenever a
  // menu / modal is open, so it's usable.
  useEffect(() => {
    if (!enabled) return;
    if (hidden) document.body.classList.remove("cursor-none");
    else document.body.classList.add("cursor-none");
  }, [enabled, hidden]);

  if (!enabled || hidden) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[90]"
      style={{ willChange: "transform", contain: "layout style paint" }}
    >
      <div
        className="relative -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          transform: `${aiming ? "scale(1.35) rotate(45deg)" : "scale(1)"} ${
            recoil ? "scale(1.4)" : ""
          }`,
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          className={aiming ? "text-gta-pink" : "text-gta-cyan"}
          style={{
            filter: `drop-shadow(0 0 4px currentColor)`,
          }}
        >
          <circle
            cx="20"
            cy="20"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.8"
          />
          <line x1="20" y1="2" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" />
          <line x1="20" y1="28" x2="20" y2="38" stroke="currentColor" strokeWidth="1.5" />
          <line x1="2" y1="20" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <line x1="28" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="1.5" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
