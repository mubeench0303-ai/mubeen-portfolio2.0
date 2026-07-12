"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Zap, RotateCcw, ShieldAlert } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { showBanner } from "@/lib/events";
import { sfx } from "@/lib/audio";

const SNIPPETS = [
  "npm run build",
  "git push origin main",
  "SELECT * FROM users;",
  "docker compose up -d",
  "const data = await fetch(url)",
  "sudo rm -rf /tmp/cache",
  "export default App;",
  "npx prisma migrate dev",
  "chmod +x deploy.sh",
  "kubectl get pods -A",
  "redis-cli FLUSHALL",
  "ssh root@10.0.0.1",
  "yarn add three",
  'grep -r "TODO" ./src',
  "curl -X POST /api/login",
  "map((x) => x.id)",
];

const TOTAL = 4;
const TIME = 40;

type Phase = "idle" | "playing" | "won" | "lost";

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HackGame() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [lines, setLines] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [time, setTime] = useState(TIME);
  const inputRef = useRef<HTMLInputElement>(null);

  // focus the moment the input mounts (after the enter animation), so you can
  // type immediately without clicking.
  const setInputRef = useCallback((el: HTMLInputElement | null) => {
    inputRef.current = el;
    if (el) el.focus();
  }, []);

  const start = () => {
    setLines(shuffle(SNIPPETS).slice(0, TOTAL));
    setIdx(0);
    setTyped("");
    setTime(TIME);
    setPhase("playing");
    sfx.select();
    setTimeout(() => inputRef.current?.focus(), 60);
  };

  // countdown
  useEffect(() => {
    if (phase !== "playing") return;
    const id = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(id);
          setPhase("lost");
          showBanner("wasted");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  const handleChange = (value: string) => {
    if (phase !== "playing") return;
    const target = lines[idx];
    if (value === target) {
      sfx.select();
      const next = idx + 1;
      setTyped("");
      if (next >= lines.length) {
        setPhase("won");
        showBanner("passed", "FIREWALL BREACHED");
      } else {
        setIdx(next);
      }
    } else {
      setTyped(value);
    }
  };

  const target = lines[idx] ?? "";
  const firewall = Math.round((time / TIME) * 100);
  const low = time <= 8;

  return (
    <section id="hack" className="section-pad">
      <div className="mx-auto w-full max-w-4xl">
        <SectionHeading index="05" kicker="Arcade · Mini-Game" title="HACK THE GRID" accent="yellow" />

        <Reveal>
          <div
            className="hud-panel relative overflow-hidden rounded-2xl"
            onClick={() => phase === "playing" && inputRef.current?.focus()}
          >
            <div className="gta-stripes h-1.5 w-full" />

            {/* top bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-gta-green" />
                <span className="font-mono text-xs uppercase tracking-widest text-gta-green">
                  root@lossantos:~$
                </span>
              </div>
              {phase === "playing" && (
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-white/70">
                    HACKED <span className="text-gta-cyan">{idx}</span>/{lines.length}
                  </span>
                  <span
                    className={`font-mono text-sm font-bold ${low ? "text-gta-pink animate-pulseGlow" : "text-gta-yellow"}`}
                  >
                    {time}s
                  </span>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {/* ── IDLE ── */}
                {phase === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <ShieldAlert className="mx-auto mb-3 text-gta-yellow" size={34} />
                    <p className="mx-auto max-w-md font-mono text-sm text-white/70">
                      Breach the system by typing{" "}
                      <span className="text-gta-cyan">{TOTAL} commands</span>{" "}
                      before the firewall locks — in just{" "}
                      <span className="text-gta-yellow">{TIME}s</span>.
                    </p>
                    <button
                      onClick={start}
                      className="focus-ring hud-chip mt-6 inline-flex items-center gap-2 bg-gta-green px-8 py-3 font-mono text-sm font-bold uppercase tracking-widest text-black transition-transform hover:scale-105"
                    >
                      <Zap size={16} /> Start Hack
                    </button>
                  </motion.div>
                )}

                {/* ── PLAYING ── */}
                {phase === "playing" && (
                  <motion.div
                    key="playing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* firewall bar */}
                    <div className="mb-5">
                      <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
                        <span>Firewall integrity</span>
                        <span>{firewall}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${low ? "bg-gta-pink" : "bg-gradient-to-r from-gta-green to-gta-cyan"}`}
                          style={{ width: `${firewall}%` }}
                        />
                      </div>
                    </div>

                    {/* target line */}
                    <div className="rounded-lg border border-white/10 bg-black/50 p-5 font-mono text-lg sm:text-2xl">
                      <span className="mr-2 text-gta-green">$</span>
                      {target.split("").map((ch, i) => {
                        let cls = "text-white/35";
                        if (i < typed.length)
                          cls = typed[i] === ch ? "text-gta-cyan" : "text-gta-pink bg-gta-pink/20";
                        const cursor = i === typed.length ? "border-b-2 border-gta-yellow" : "";
                        return (
                          <span key={i} className={`${cls} ${cursor}`}>
                            {ch === " " ? "\u00A0" : ch}
                          </span>
                        );
                      })}
                    </div>

                    <input
                      ref={setInputRef}
                      value={typed}
                      onChange={(e) => handleChange(e.target.value)}
                      maxLength={target.length}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      onBlur={() => phase === "playing" && setTimeout(() => inputRef.current?.focus(), 10)}
                      className="pointer-events-none absolute h-0 w-0 opacity-0"
                      aria-label="Type the command"
                    />

                    <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-widest text-muted">
                      Type the command exactly · keep going
                    </p>
                  </motion.div>
                )}

                {/* ── WON / LOST ── */}
                {(phase === "won" || phase === "lost") && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <h3
                      className={`gta-title text-4xl sm:text-6xl ${phase === "won" ? "neon-cyan" : "neon-pink"}`}
                    >
                      {phase === "won" ? "ACCESS GRANTED" : "LOCKED OUT"}
                    </h3>
                    <p className="mt-2 font-mono text-sm text-white/70">
                      {phase === "won"
                        ? `Breached all ${lines.length} commands. Respect +100.`
                        : `The firewall locked you out. ${idx}/${lines.length} breached.`}
                    </p>
                    <button
                      onClick={start}
                      className="focus-ring hud-chip mt-6 inline-flex items-center gap-2 border border-white/25 bg-black/40 px-7 py-3 font-mono text-sm font-bold uppercase tracking-widest text-white transition-transform hover:scale-105"
                    >
                      <RotateCcw size={16} /> Retry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
