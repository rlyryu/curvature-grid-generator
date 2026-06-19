import type { GravitySettings, MassPoint } from "../lib/types";
import { useGravityStore } from "../store/useGravityStore";

type ControlPanelProps = {
  onExportPng: () => void;
};

type NumberFieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

function NumberField({ label, value, min, max, step, onChange }: NumberFieldProps) {
  return (
    <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
      <span>{label}</span>
      <div className="grid grid-cols-[1fr_4.75rem] gap-3">
        <input
          className="accent-cyan-300"
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <input
          className="h-8 rounded-md border border-cyan-300/20 bg-black/45 px-2 text-right text-sm text-slate-100 outline-none transition focus:border-cyan-300/70"
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </div>
    </label>
  );
}

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function TextField({ label, value, onChange }: TextFieldProps) {
  return (
    <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
      <span>{label}</span>
      <input
        className="h-9 rounded-md border border-cyan-300/20 bg-black/45 px-3 text-sm normal-case tracking-normal text-slate-100 outline-none transition focus:border-cyan-300/70"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

type ColorFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function ColorField({ label, value, onChange }: ColorFieldProps) {
  return (
    <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
      <span>{label}</span>
      <div className="grid grid-cols-[2.5rem_1fr] gap-3">
        <input
          className="h-9 w-10 cursor-pointer rounded-md border border-cyan-300/20 bg-black/45 p-1"
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <span className="flex h-9 items-center rounded-md border border-cyan-300/20 bg-black/45 px-3 text-sm normal-case tracking-normal text-slate-100">
          {value}
        </span>
      </div>
    </label>
  );
}

type ToggleFieldProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function ToggleField({ label, checked, onChange }: ToggleFieldProps) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-md border border-cyan-300/15 bg-black/25 px-3 py-2 text-xs uppercase tracking-[0.16em] text-slate-300">
      <span>{label}</span>
      <input
        className="h-4 w-4 accent-cyan-300"
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
    </label>
  );
}

type MassEditorProps = {
  mass: MassPoint;
  index: number;
  gridSize: number;
  onUpdate: (patch: Partial<MassPoint>) => void;
  onDelete: () => void;
};

function MassEditor({ mass, index, gridSize, onUpdate, onDelete }: MassEditorProps) {
  const extent = gridSize / 2;

  return (
    <section className="rounded-lg border border-cyan-300/15 bg-white/[0.035] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">Mass {index + 1}</h3>
          <p className="mt-1 text-xs text-slate-500">{mass.id}</p>
        </div>
        <button
          className="h-8 rounded-md border border-rose-300/20 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-rose-200 transition hover:border-rose-300/70 hover:bg-rose-400/10"
          type="button"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
      <div className="grid gap-4">
        <TextField
          label="Alias"
          value={mass.alias}
          onChange={(alias) => onUpdate({ alias })}
        />
        <ToggleField
          label="Show Sphere"
          checked={mass.showSphere}
          onChange={(showSphere) => onUpdate({ showSphere })}
        />
        <ToggleField
          label="Show Alias"
          checked={mass.showAlias}
          onChange={(showAlias) => onUpdate({ showAlias })}
        />
        <NumberField
          label="X Position"
          value={mass.x}
          min={-extent}
          max={extent}
          step={0.1}
          onChange={(x) => onUpdate({ x })}
        />
        <NumberField
          label="Y Position"
          value={mass.y}
          min={-extent}
          max={extent}
          step={0.1}
          onChange={(y) => onUpdate({ y })}
        />
        <NumberField
          label="Mass"
          value={mass.mass}
          min={0.1}
          max={10}
          step={0.1}
          onChange={(massValue) => onUpdate({ mass: massValue })}
        />
        <NumberField
          label="Radius"
          value={mass.radius}
          min={0.08}
          max={0.9}
          step={0.01}
          onChange={(radius) => onUpdate({ radius })}
        />
      </div>
    </section>
  );
}

export function ControlPanel({ onExportPng }: ControlPanelProps) {
  const masses = useGravityStore((state) => state.masses);
  const settings = useGravityStore((state) => state.settings);
  const addMass = useGravityStore((state) => state.addMass);
  const removeMass = useGravityStore((state) => state.removeMass);
  const updateMass = useGravityStore((state) => state.updateMass);
  const updateSettings = useGravityStore((state) => state.updateSettings);
  const requestLevelView = useGravityStore((state) => state.requestLevelView);

  const setSetting =
    <Key extends keyof GravitySettings>(key: Key) =>
    (value: GravitySettings[Key]) => {
      updateSettings({ [key]: value } as Partial<GravitySettings>);
    };

  return (
    <aside className="pointer-events-auto flex h-full w-full max-w-[24rem] flex-col border-r border-cyan-300/15 bg-panel text-slate-100 shadow-panel backdrop-blur-xl">
      <div className="border-b border-cyan-300/15 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
          Curvature Grid
        </p>
        <h1 className="mt-2 text-2xl font-semibold leading-tight">
          Gravity Well Visualizer
        </h1>
        <button
          className="mt-4 h-9 w-full rounded-md border border-cyan-300/30 bg-cyan-300/10 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20"
          type="button"
          onClick={onExportPng}
        >
          Export PNG
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-5">
        <section className="grid gap-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
              Global Settings
            </h2>
            <button
              className="h-9 rounded-md border border-cyan-300/30 bg-cyan-300/10 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20"
              type="button"
              onClick={requestLevelView}
              title="Reset camera to a level grid view"
            >
              Level
            </button>
          </div>
          <NumberField
            label="Grid Size"
            value={settings.gridSize}
            min={6}
            max={18}
            step={0.5}
            onChange={setSetting("gridSize")}
          />
          <NumberField
            label="Segments"
            value={settings.segments}
            min={24}
            max={160}
            step={1}
            onChange={(segments) => updateSettings({ segments: Math.round(segments) })}
          />
          <NumberField
            label="Strength"
            value={settings.strength}
            min={0.1}
            max={2}
            step={0.05}
            onChange={setSetting("strength")}
          />
          <NumberField
            label="Softening"
            value={settings.softening}
            min={0.05}
            max={3}
            step={0.05}
            onChange={setSetting("softening")}
          />
          <NumberField
            label="Max Depth"
            value={settings.maxDepth}
            min={1}
            max={8}
            step={0.1}
            onChange={setSetting("maxDepth")}
          />
          <ColorField
            label="Grid Color"
            value={settings.gridColor}
            onChange={setSetting("gridColor")}
          />
        </section>

        <section className="mt-8 grid gap-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
              Masses
            </h2>
            <button
              className="h-9 rounded-md border border-cyan-300/30 bg-cyan-300/10 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20"
              type="button"
              onClick={addMass}
            >
              Add Mass
            </button>
          </div>

          {masses.map((mass, index) => (
            <MassEditor
              key={mass.id}
              mass={mass}
              index={index}
              gridSize={settings.gridSize}
              onUpdate={(patch) => updateMass(mass.id, patch)}
              onDelete={() => removeMass(mass.id)}
            />
          ))}
        </section>
      </div>
    </aside>
  );
}
