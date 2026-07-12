import * as THREE from "three";

export type Waypoint = {
  position: [number, number, number];
  lookAt: [number, number, number];
};

// Camera "drives" down a neon Los Santos street as you scroll (0 → 1).
export const cameraWaypoints: Waypoint[] = [
  { position: [0, 3.2, 16], lookAt: [0, 2.2, -10] }, // HERO
  { position: [-3.4, 2.4, 2], lookAt: [1, 1.8, -22] }, // PROFILE
  { position: [3.6, 2.0, -18], lookAt: [-1, 1.6, -44] }, // STATS
  { position: [-2.2, 4.5, -40], lookAt: [0, 1.4, -66] }, // MISSIONS
  { position: [0, 1.4, -64], lookAt: [0, 2.0, -88] }, // CAREER
  { position: [3.0, 3.0, -88], lookAt: [-1.5, 2.2, -112] }, // CONTACT
  { position: [0, 6.5, -116], lookAt: [0, 1.0, -138] },
];

export function sampleWaypoints(t: number) {
  const clamped = Math.min(Math.max(t, 0), 1);
  const segments = cameraWaypoints.length - 1;
  const scaled = clamped * segments;
  const idx = Math.min(Math.floor(scaled), segments - 1);
  const localT = scaled - idx;
  const eased = localT * localT * (3 - 2 * localT);

  const a = cameraWaypoints[idx];
  const b = cameraWaypoints[idx + 1];

  const position = new THREE.Vector3(...a.position).lerp(
    new THREE.Vector3(...b.position),
    eased
  );
  const lookAt = new THREE.Vector3(...a.lookAt).lerp(
    new THREE.Vector3(...b.lookAt),
    eased
  );

  return { position, lookAt };
}
