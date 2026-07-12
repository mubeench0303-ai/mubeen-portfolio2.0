"use client";

export type BannerType = "passed" | "wasted";
export type CheatEffect = "money" | "confetti";

export function showBanner(type: BannerType, text?: string) {
  window.dispatchEvent(
    new CustomEvent("gta:banner", { detail: { type, text } })
  );
}

export function openMission(id: string) {
  window.dispatchEvent(new CustomEvent("gta:mission", { detail: id }));
}

export function fireCheat(effect: CheatEffect, label: string) {
  window.dispatchEvent(
    new CustomEvent("gta:cheat", { detail: { effect, label } })
  );
}

export function setAiming(aiming: boolean) {
  window.dispatchEvent(new CustomEvent("gta:aim", { detail: aiming }));
}
