import { Text } from "@react-three/drei";
import { computeGravityWell } from "../lib/gravity";
import type { GravitySettings, MassPoint } from "../lib/types";

type MassSphereProps = {
  index: number;
  mass: MassPoint;
  masses: MassPoint[];
  settings: GravitySettings;
};

export function MassSphere({ index, mass, masses, settings }: MassSphereProps) {
  if (!mass.showSphere && !mass.showAlias) {
    return null;
  }

  const surfaceZ = computeGravityWell(mass.x, mass.y, masses, settings);
  const z = surfaceZ + mass.radius + 0.16;
  const label = mass.alias.trim() || `Mass ${index + 1}`;

  return (
    <group position={[mass.x, mass.y, z]}>
      {mass.showSphere && (
        <mesh>
          <sphereGeometry args={[mass.radius, 48, 32]} />
          <meshStandardMaterial
            color={mass.color ?? "#f8fafc"}
            emissive="#b7d8ff"
            emissiveIntensity={0.18}
            roughness={0.28}
            metalness={0.12}
          />
        </mesh>
      )}
      {mass.showAlias && (
        <Text
          position={[0, 0, mass.radius + 0.28]}
          color="#bfe9ff"
          fontSize={0.2}
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  );
}
