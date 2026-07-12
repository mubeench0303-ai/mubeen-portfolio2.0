"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, profile } from "@/lib/data";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* top bar */}
      <div className="fixed left-0 right-0 top-0 z-40">
        <div className="gta-stripes h-1 w-full" />
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <button
            onClick={() => go("hero")}
            className="focus-ring gta-title text-xl text-white sm:text-2xl"
          >
            <span className="neon-pink">D</span>
            <span className="neon-cyan">C</span>
            <span className="ml-2 hidden font-mono text-[10px] font-normal uppercase tracking-widest text-muted sm:inline">
              {profile.name}
            </span>
          </button>

          {/* desktop: current section + weapon-wheel hint */}
          <div className="hidden items-center gap-3 md:flex">
            <span className="font-mono text-xs uppercase tracking-widest text-gta-yellow">
              <span className="text-gta-pink">›</span>{" "}
              {navItems.find((n) => n.id === active)?.label}
            </span>
          </div>

          {/* mobile toggle */}
          <button
            onClick={() => setOpen(true)}
            className="focus-ring rounded border border-white/15 bg-black/50 p-2 text-white md:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* mobile pause-menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#05060a]/95 backdrop-blur-md md:hidden"
          >
            <div className="gta-stripes h-2 w-full" />
            <div className="flex items-center justify-between px-6 py-4">
              <span className="hud-label text-gta-cyan">PAUSE MENU</span>
              <button
                onClick={() => setOpen(false)}
                className="focus-ring rounded border border-white/15 p-2 text-white"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {navItems.map((n, i) => (
                <motion.button
                  key={n.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => go(n.id)}
                  className={`gta-title text-left text-4xl transition-colors ${
                    active === n.id ? "neon-yellow" : "text-white/80"
                  }`}
                >
                  {n.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
