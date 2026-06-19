import { useCallback, useState } from "react";
import { ControlPanel } from "./components/ControlPanel";
import { Scene } from "./components/Scene";

export default function App() {
  const [exportPng, setExportPng] = useState<() => void>(() => () => undefined);
  const handleExportReady = useCallback((nextExportPng: () => void) => {
    setExportPng(() => nextExportPng);
  }, []);

  return (
    <main className="relative h-screen overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Scene onExportReady={handleExportReady} />
      </div>
      <div className="absolute inset-y-0 left-0 z-10 w-[min(24rem,100vw)]">
        <ControlPanel onExportPng={exportPng} />
      </div>
    </main>
  );
}
