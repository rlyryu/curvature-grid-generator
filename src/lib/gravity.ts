import type { GravitySettings, MassPoint } from "./types";

export function computeInverseDistanceWell(
  x: number,
  y: number,
  masses: MassPoint[],
  settings: GravitySettings,
) {
  const { strength, softening, maxDepth } = settings;
  let z = 0;

  for (const mass of masses) {
    const dx = x - mass.x;
    const dy = y - mass.y;
    const r2 = dx * dx + dy * dy + softening;
    z -= (strength * mass.mass) / Math.sqrt(r2);
  }

  return Math.max(z, -maxDepth);
}

export function computeGravityWell(
  x: number,
  y: number,
  masses: MassPoint[],
  settings: GravitySettings,
) {
  return computeInverseDistanceWell(x, y, masses, settings);
}
