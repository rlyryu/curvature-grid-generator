import { useEffect, useMemo } from "react";
import { BufferAttribute, BufferGeometry } from "three";
import { computeGravityWell } from "../lib/gravity";
import type { GravitySettings, MassPoint } from "../lib/types";

type GravityGridProps = {
  masses: MassPoint[];
  settings: GravitySettings;
};

export function GravityGrid({ masses, settings }: GravityGridProps) {
  const geometry = useMemo(() => {
    const segmentCount = Math.max(8, Math.round(settings.segments));
    const halfSize = settings.gridSize / 2;
    const step = settings.gridSize / segmentCount;
    const vertices: number[] = [];

    const pushVertex = (x: number, y: number) => {
      vertices.push(x, y, computeGravityWell(x, y, masses, settings));
    };

    for (let row = 0; row <= segmentCount; row += 1) {
      const y = -halfSize + row * step;

      for (let column = 0; column < segmentCount; column += 1) {
        const x = -halfSize + column * step;
        pushVertex(x, y);
        pushVertex(x + step, y);
      }
    }

    for (let column = 0; column <= segmentCount; column += 1) {
      const x = -halfSize + column * step;

      for (let row = 0; row < segmentCount; row += 1) {
        const y = -halfSize + row * step;
        pushVertex(x, y);
        pushVertex(x, y + step);
      }
    }

    const lineGeometry = new BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(vertices), 3),
    );

    return lineGeometry;
  }, [masses, settings]);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color={settings.gridColor}
        transparent
        opacity={0.78}
      />
    </lineSegments>
  );
}
