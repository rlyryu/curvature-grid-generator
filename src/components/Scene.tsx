import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { GravityGrid } from "./GravityGrid";
import { MassSphere } from "./MassSphere";
import { useGravityStore } from "../store/useGravityStore";

type SceneProps = {
  onExportReady: (exportPng: () => void) => void;
};

function LevelableOrbitControls({ levelViewRequest }: { levelViewRequest: number }) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(6.2, -8.2, 5.2);
    camera.up.set(0, 0, 1);
    controlsRef.current?.target.set(0, 0, -1.4);
    controlsRef.current?.update();
  }, [camera, levelViewRequest]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      target={[0, 0, -1.4]}
      minDistance={4}
      maxDistance={18}
      enableDamping
      dampingFactor={0.08}
    />
  );
}

function SceneExporter({ onExportReady }: SceneProps) {
  const { gl, camera, scene } = useThree();

  useEffect(() => {
    onExportReady(() => {
      gl.render(scene, camera);

      const link = document.createElement("a");
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      link.href = gl.domElement.toDataURL("image/png");
      link.download = `gravity-well-${timestamp}.png`;
      link.click();
    });
  }, [camera, gl, onExportReady, scene]);

  return null;
}

export function Scene({ onExportReady }: SceneProps) {
  const masses = useGravityStore((state) => state.masses);
  const settings = useGravityStore((state) => state.settings);
  const levelViewRequest = useGravityStore((state) => state.levelViewRequest);

  return (
    <Canvas
      camera={{ position: [6.2, -8.2, 5.2], fov: 46, near: 0.1, far: 100 }}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 11, 21]} />
      <ambientLight intensity={0.38} />
      <directionalLight position={[4, -5, 8]} intensity={1.3} />
      <pointLight position={[-4, 3, 4]} color="#2fd8ff" intensity={0.9} />
      <Stars radius={38} depth={18} count={700} factor={1.5} fade speed={0.35} />
      <GravityGrid masses={masses} settings={settings} />
      {masses.map((mass, index) => (
        <MassSphere
          key={mass.id}
          index={index}
          mass={mass}
          masses={masses}
          settings={settings}
        />
      ))}
      <LevelableOrbitControls levelViewRequest={levelViewRequest} />
      <SceneExporter onExportReady={onExportReady} />
    </Canvas>
  );
}
