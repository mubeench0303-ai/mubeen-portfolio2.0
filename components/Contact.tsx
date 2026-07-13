"use client";

import { motion } from "framer-motion";
import { Signal, Wifi, BatteryFull } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { contacts, profile } from "@/lib/data";

export default function Contact() {
  const time = "12:04";

  return (
    <section id="contact" className="section-pad">
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeading index="06" kicker="Get in Touch" title="THE PHONE" accent="cyan" />

        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* phone mockup */}
          <Reveal className="flex justify-center">
            <motion.div
              whileHover={{ rotate: 0, y: -8 }}
              initial={{ rotate: -4 }}
              className="phone-frame relative w-[330px] max-w-[85vw] rounded-[3.2rem] p-[10px]"
            >
              {/* side buttons */}
              <span className="phone-btn absolute -left-[2px] top-[130px] h-7 w-[3px] rounded-l" />
              <span className="phone-btn absolute -left-[2px] top-[180px] h-14 w-[3px] rounded-l" />
              <span className="phone-btn absolute -left-[2px] top-[250px] h-14 w-[3px] rounded-l" />
              <span className="phone-btn absolute -right-[2px] top-[210px] h-20 w-[3px] rounded-r" />

              <div className="phone-screen relative flex aspect-[9/19] flex-col overflow-hidden rounded-[2.6rem] bg-[#05060a]">
                {/* dynamic island */}
                <div className="absolute left-1/2 top-3 z-20 flex h-[26px] w-[95px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-3.5">
                  <span className="h-2 w-2 rounded-full bg-[#0b0d16] ring-1 ring-white/10" />
                </div>

                {/* status bar */}
                <div className="flex items-center justify-between px-7 pt-4 font-mono text-[11px] font-semibold text-white/90">
                  <span>{time}</span>
                  <div className="flex items-center gap-1.5">
                    <Signal size={13} />
                    <Wifi size={13} />
                    <BatteryFull size={16} />
                  </div>
                </div>

                {/* wallpaper */}
                <div className="relative mt-4 h-44 overflow-hidden">
                  <div className="gta-stripes absolute inset-0 opacity-30" />
                  <div className="relative flex h-full flex-col items-center justify-center">
                    <p className="gta-title text-5xl text-white">iFruit</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-white/70">
                      {profile.handle}
                    </p>
                  </div>
                </div>

                {/* app list = contacts */}
                <div className="flex-1 space-y-3 px-5 py-5">
                  {contacts.map((c, i) => (
                    <motion.a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="focus-ring grid grid-cols-[78px_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 transition-colors hover:border-gta-cyan"
                    >
                      <span className="font-mono text-[11px] uppercase tracking-wide text-white/60">
                        {c.label}
                      </span>
                      <span className="min-w-0 break-all text-right font-mono text-[11px] leading-4 text-white">
                        {c.value}
                      </span>
                    </motion.a>
                  ))}
                </div>

                {/* home bar */}
                <div className="flex justify-center pb-3">
                  <span className="h-1 w-28 rounded-full bg-white/40" />
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* CTA */}
          <div>
            <Reveal>
              <p className="gta-title text-4xl text-white sm:text-5xl">
                READY FOR THE{" "}
                <span className="neon-pink">NEXT MISSION?</span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-white/70">
                A new project, a collaboration, or just a hello — my phone is
                always on. Send a message and let&apos;s start the game.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href={`mailto:${profile.email}`}
                className="focus-ring mt-6 inline-block hud-chip bg-gta-cyan px-8 py-3 font-mono text-sm font-bold uppercase tracking-widest text-black transition-transform hover:scale-105"
              >
                Send Message
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
