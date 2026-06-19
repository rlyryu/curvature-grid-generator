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
    const massSpread = Math.max(0.25, Math.sqrt(mass.mass) * 1.2);
    const distanceScale = massSpread * massSpread;
    const r2 = (dx * dx + dy * dy) / distanceScale + softening;
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
