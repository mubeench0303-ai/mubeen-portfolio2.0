"use client";

import { ExternalLink, Github, Star } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { missions } from "@/lib/data";

export default function Projects() {
  return (
    <section id="missions" className="section-pad">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading index="03" kicker="Job Board" title="MISSIONS" accent="yellow" />

        <div className="grid gap-6 md:grid-cols-2">
          {missions.map((m, i) => (
            <Reveal key={m.id} delay={(i % 2) * 0.1}>
              <article className="mission-card hud-panel group relative h-full overflow-hidden rounded-2xl p-6">
                {/* status ribbon */}
                <span
                  className={`absolute right-0 top-4 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest ${
                    m.status === "COMPLETED"
                      ? "bg-gta-green/20 text-gta-green"
                      : "bg-gta-yellow/20 text-gta-yellow animate-pulseGlow"
                  }`}
                >
                  {m.status}
                </span>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-gta-cyan">{m.code}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        size={11}
                        className={
                          s < m.difficulty
                            ? "fill-gta-yellow text-gta-yellow"
                            : "text-white/20"
                        }
                      />
                    ))}
                  </div>
                </div>

                <h3 className="gta-title mt-2 text-3xl text-white transition-colors group-hover:text-gta-pink">
                  {m.name}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {m.brief}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {m.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="font-mono text-sm font-bold text-gta-green">
                    {m.reward}
                  </span>
                  <div className="flex gap-3">
                    <a
                      href={m.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring text-muted transition-colors hover:text-white"
                      aria-label="Source code"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={m.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring text-muted transition-colors hover:text-gta-cyan"
                      aria-label="Live demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
