"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { profile } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading index="01" kicker="Character Profile" title="THE PLAYER" accent="cyan" />

        <div className="grid gap-8 md:grid-cols-[320px_1fr]">
          {/* character card */}
          <Reveal>
            <div className="hud-panel relative overflow-hidden rounded-2xl p-1">
              <div className="gta-stripes absolute inset-x-0 top-0 h-1.5" />
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#1a1030] to-[#05060a]">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="gta-title text-2xl text-white">{profile.name}</p>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-gta-cyan">
                    {profile.handle}
                  </p>
                </div>
                {/* scanline */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="h-16 w-full animate-scan bg-gradient-to-b from-transparent via-gta-cyan/20 to-transparent" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* bio + intel */}
          <div>
            {profile.bio.map((p, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <p className="mb-4 text-lg leading-relaxed text-white/85">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: MapPin, label: "Location", value: profile.location },
                  { icon: Mail, label: "Email", value: profile.email },
                  { icon: Phone, label: "Phone", value: profile.phone },
                ].map((it) => (
                  <div
                    key={it.label}
                    className="hud-panel rounded-xl p-4"
                  >
                    <it.icon className="mb-2 text-gta-pink" size={18} />
                    <p className="hud-label mb-0.5">{it.label}</p>
                    <p className="truncate font-mono text-sm text-white">
                      {it.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <motion.a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-6 inline-block hud-chip bg-gta-yellow px-7 py-3 font-mono text-sm font-bold uppercase tracking-widest text-black transition-transform hover:scale-105"
              >
                Download Rap Sheet (CV)
              </motion.a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
