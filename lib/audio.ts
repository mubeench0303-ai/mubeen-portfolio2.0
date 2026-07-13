"use client";

import { getState, subscribe } from "./gameStore";

// Web Audio based — no asset files needed. All sounds are synthesized,
// so it works fully offline.

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let musicGain: GainNode | null = null;
let musicTimer: ReturnType<typeof setInterval> | null = null;
let musicEl: HTMLAudioElement | null = null;
let step = 0;
let initialized = false;
const MUSIC_FILE = "/audio/music.mp3";

function ensureCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);

    musicGain = ctx.createGain();
    musicGain.gain.value = 0;
    musicGain.connect(master);
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function blip(
  freq: number,
  dur: number,
  type: OscillatorType,
  vol: number,
  slideTo?: number
) {
  if (!getState().sfxOn) return;
  const c = ensureCtx();
  if (!c || !master) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime);
  if (slideTo) {
    osc.frequency.exponentialRampToValueAtTime(
      slideTo,
      c.currentTime + dur
    );
  }
  gain.gain.setValueAtTime(0.0001, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(vol, c.currentTime + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  osc.connect(gain);
  gain.connect(master);
  osc.start();
  osc.stop(c.currentTime + dur + 0.02);
}

function chord(freqs: number[], dur: number, type: OscillatorType, vol: number) {
  freqs.forEach((f) => blip(f, dur, type, vol));
}

export const sfx = {
  hover: () => blip(1400, 0.05, "square", 0.03),
  click: () => blip(720, 0.09, "sawtooth", 0.06, 320),
  select: () => {
    blip(520, 0.06, "square", 0.05);
    setTimeout(() => blip(880, 0.08, "square", 0.05), 60);
  },
  open: () => blip(300, 0.12, "sine", 0.06, 900),
  cheat: () => {
    [523, 659, 784, 1046].forEach((f, i) =>
      setTimeout(() => blip(f, 0.12, "square", 0.06), i * 70)
    );
  },
  passed: () => {
    // triumphant major chord
    setTimeout(() => chord([523, 659, 784], 0.5, "sawtooth", 0.05), 0);
    setTimeout(() => chord([659, 784, 988], 0.7, "sawtooth", 0.05), 180);
  },
  wasted: () => {
    // slow descending
    [440, 349, 262, 196].forEach((f, i) =>
      setTimeout(() => blip(f, 0.4, "sawtooth", 0.06), i * 160)
    );
  },
  shot: () => {
    if (!getState().sfxOn) return;
    const c = ensureCtx();
    if (!c || !master) return;
    // short noise burst = gunshot crack
    const dur = 0.16;
    const buffer = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2.2);
    }
    const noise = c.createBufferSource();
    noise.buffer = buffer;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 2200;
    const g = c.createGain();
    g.gain.value = 0.22;
    noise.connect(lp);
    lp.connect(g);
    g.connect(master);
    noise.start();
    noise.stop(c.currentTime + dur);
    // low thump
    blip(150, 0.12, "sine", 0.12, 55);
  },
};

// ── Synthwave background loop ──
const BASS = [55, 55, 82, 73]; // A1, A1, E2, D2
const ARP = [220, 277, 330, 440, 330, 277];

function scheduleStep() {
  const c = ensureCtx();
  if (!c || !musicGain) return;
  const t = c.currentTime;

  // bass note (one per bar-ish)
  if (step % 4 === 0) {
    const bass = c.createOscillator();
    const bg = c.createGain();
    bass.type = "sawtooth";
    bass.frequency.value = BASS[(step / 4) % BASS.length];
    bg.gain.setValueAtTime(0.0001, t);
    bg.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
    bg.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    bass.connect(bg);
    bg.connect(musicGain);
    bass.start();
    bass.stop(t + 0.55);
  }

  // arp pluck
  const arp = c.createOscillator();
  const ag = c.createGain();
  arp.type = "triangle";
  arp.frequency.value = ARP[step % ARP.length];
  ag.gain.setValueAtTime(0.0001, t);
  ag.gain.exponentialRampToValueAtTime(0.08, t + 0.01);
  ag.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
  arp.connect(ag);
  ag.connect(musicGain);
  arp.start();
  arp.stop(t + 0.25);

  step++;
}

function ensureMusicElement() {
  if (typeof window === "undefined") return null;
  if (!musicEl) {
    const el = new Audio(MUSIC_FILE);
    el.loop = true;
    el.preload = "auto";
    el.volume = 0.42;
    musicEl = el;
  }
  return musicEl;
}

function startMusic() {
  // Prefer real music track if available in /public/audio/music.mp3.
  // If not available (404 or blocked), fallback to synth loop.
  const el = ensureMusicElement();
  if (el) {
    el.currentTime = 0;
    void el.play().then(() => {
      if (musicTimer) {
        clearInterval(musicTimer);
        musicTimer = null;
      }
    }).catch(() => {
      const c = ensureCtx();
      if (!c || !musicGain || musicTimer) return;
      musicGain.gain.cancelScheduledValues(c.currentTime);
      musicGain.gain.linearRampToValueAtTime(0.6, c.currentTime + 1.2);
      musicTimer = setInterval(scheduleStep, 200);
    });
    return;
  }
  const c = ensureCtx();
  if (!c || !musicGain || musicTimer) return;
  musicGain.gain.cancelScheduledValues(c.currentTime);
  musicGain.gain.linearRampToValueAtTime(0.6, c.currentTime + 1.2);
  musicTimer = setInterval(scheduleStep, 200);
}

function stopMusic() {
  if (musicEl) {
    musicEl.pause();
  }
  const c = ensureCtx();
  if (musicGain && c) {
    musicGain.gain.cancelScheduledValues(c.currentTime);
    musicGain.gain.linearRampToValueAtTime(0, c.currentTime + 0.4);
  }
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
}

// react to store changes for music on/off
export function initAudio() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  // unlock audio on first gesture
  const unlock = () => ensureCtx();
  window.addEventListener("pointerdown", unlock, { once: false });
  window.addEventListener("keydown", unlock, { once: false });

  let prevMusic = getState().musicOn;
  subscribe(() => {
    const { musicOn } = getState();
    if (musicOn && !prevMusic) startMusic();
    if (!musicOn && prevMusic) stopMusic();
    prevMusic = musicOn;
  });
}
