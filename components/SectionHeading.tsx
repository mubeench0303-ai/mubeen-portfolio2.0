"use client";

import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  kicker,
  title,
  accent = "pink",
}: {
  index: string;
  kicker: string;
  title: string;
  accent?: "pink" | "cyan" | "yellow";
}) {
  const accentClass =
    accent === "cyan"
      ? "neon-cyan"
      : accent === "yellow"
        ? "neon-yellow"
        : "neon-pink";

  return (
    <Reveal className="mb-10">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-gta-yellow">{index}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent sm:max-w-[120px]" />
        <span className="hud-label">{kicker}</span>
      </div>
      <h2 className={`gta-title mt-3 text-5xl sm:text-6xl md:text-7xl ${accentClass}`}>
        {title}
      </h2>
    </Reveal>
  );
}
