"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks page scroll progress (0 → 1) in a ref, not React state,
 * so it can be read every animation frame inside useFrame() without
 * triggering component re-renders on every scroll tick.
 */
export function useScrollProgressRef() {
  const progress = useRef(0);

  useEffect(() => {
    const handle = () => {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
    };
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, []);

  return progress;
}
