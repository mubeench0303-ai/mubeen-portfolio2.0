"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { stats, type Stat } from "@/lib/data";

const categories: Stat["category"][] = ["Backend", "Frontend", "Tools"];
const accentFor: Record<Stat["category"], string> = {
  Backend: "from-gta-pink to-gta-purple",
  Frontend: "from-gta-cyan to-gta-green",
  Tools: "from-gta-yellow to-gta-orange",
};

function StatBar({ stat }: { stat: Stat }) {
  return (
    <div className="mb-3.5">
      <div className="mb-1 flex items-center justify-between">
        <span className="font-mono text-sm text-white/90">{stat.name}</span>
        <span className="font-mono text-xs text-gta-yellow">{stat.value}</span>
      </div>
      <div className="stat-track h-2.5 w-full overflow-hidden rounded-full">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${accentFor[stat.category]}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${stat.value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-pad">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading index="02" kicker="Character Stats" title="STATS & SKILLS" accent="pink" />

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat, ci) => (
            <Reveal key={cat} delay={ci * 0.12}>
              <div className="hud-panel h-full rounded-2xl p-6">
                <h3 className="gta-title mb-5 text-2xl text-white">
                  <span
                    className={`bg-gradient-to-r ${accentFor[cat]} bg-clip-text text-transparent`}
                  >
                    {cat}
                  </span>
                </h3>
                {stats
                  .filter((s) => s.category === cat)
                  .map((s) => (
                    <StatBar key={s.name} stat={s} />
                  ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
