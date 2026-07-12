"use client";

import { social, profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 py-10">
      <div className="gta-stripes absolute inset-x-0 top-0 h-1" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="gta-title text-2xl">
          <span className="neon-pink">D</span>
          <span className="neon-cyan">C</span>
          <span className="ml-2 font-mono text-[11px] font-normal uppercase tracking-widest text-muted">
            {profile.name}
          </span>
        </p>

        <div className="flex gap-5">
          {social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-gta-yellow"
            >
              {s.label}
            </a>
          ))}
        </div>

        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
          © {new Date().getFullYear()} · No rights reserved, just vibes
        </p>
      </div>
    </footer>
  );
}
