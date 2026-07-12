"use client";

import { useSyncExternalStore } from "react";

export type TimeOfDay = "night" | "sunset";

export type GameState = {
  timeOfDay: TimeOfDay;
  sfxOn: boolean;
  musicOn: boolean;
  overlays: number;
};

let state: GameState = {
  timeOfDay: "night",
  sfxOn: true,
  musicOn: false,
  overlays: 0,
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function getState(): GameState {
  return state;
}

export function setTimeOfDay(t: TimeOfDay) {
  if (state.timeOfDay === t) return;
  state = { ...state, timeOfDay: t };
  emit();
}

export function toggleTimeOfDay() {
  setTimeOfDay(state.timeOfDay === "night" ? "sunset" : "night");
}

export function setSfx(on: boolean) {
  state = { ...state, sfxOn: on };
  emit();
}

export function setMusic(on: boolean) {
  state = { ...state, musicOn: on };
  emit();
}

// track open overlays/modals so the game cursor can yield to the system cursor
export function pushOverlay() {
  state = { ...state, overlays: state.overlays + 1 };
  emit();
}

export function popOverlay() {
  state = { ...state, overlays: Math.max(0, state.overlays - 1) };
  emit();
}

export function useGameStore(): GameState {
  return useSyncExternalStore(subscribe, getState, getState);
}
