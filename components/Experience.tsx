"use client";

import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="section-pad">
      <div className="mx-auto w-full max-w-4xl">
        <SectionHeading index="04" kicker="Criminal Record" title="CAREER LOG" accent="pink" />

        <div className="relative border-l-2 border-white/15 pl-8">
          {experience.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.1}>
              <div className="relative mb-10 last:mb-0">
                {/* node */}
                <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-gta-pink bg-[#05060a]">
                  <span className="h-2 w-2 rounded-full bg-gta-pink" />
                </span>

                <div className="hud-panel rounded-xl p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="gta-title text-2xl text-white">{e.role}</h3>
                    <span className="font-mono text-xs text-gta-yellow">
                      {e.period}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-sm text-gta-cyan">{e.org}</p>
                  <ul className="mt-3 space-y-1.5">
                    {e.points.map((p, j) => (
                      <li
                        key={j}
                        className="flex gap-2 text-sm text-white/75"
                      >
                        <span className="text-gta-green">›</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
