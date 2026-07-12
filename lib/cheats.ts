"use client";

import { fireCheat, showBanner } from "./events";
import { setTimeOfDay } from "./gameStore";

export type Cheat = {
  code: string;
  label: string;
  desc: string;
  run: () => void;
};

export const cheats: Cheat[] = [
  {
    code: "HESOYAM",
    label: "HESOYAM",
    desc: "Cash drop — money rain",
    run: () => fireCheat("money", "HESOYAM"),
  },
  {
    code: "FIESTA",
    label: "FIESTA",
    desc: "Throw confetti",
    run: () => fireCheat("confetti", "FIESTA"),
  },
  {
    code: "NIGHT",
    label: "NIGHT",
    desc: "Switch to night mode",
    run: () => setTimeOfDay("night"),
  },
  {
    code: "SUNSET",
    label: "SUNSET",
    desc: "Switch to sunset mode",
    run: () => setTimeOfDay("sunset"),
  },
  {
    code: "PASSED",
    label: "PASSED",
    desc: "Mission passed banner",
    run: () => showBanner("passed", "CHEAT ACTIVATED"),
  },
  {
    code: "WASTED",
    label: "WASTED",
    desc: "Wasted screen",
    run: () => showBanner("wasted"),
  },
];
