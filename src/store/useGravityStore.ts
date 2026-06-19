import { create } from "zustand";
import type { GravitySettings, MassPoint } from "../lib/types";

type GravityState = {
  masses: MassPoint[];
  settings: GravitySettings;
  levelViewRequest: number;
  addMass: () => void;
  removeMass: (id: string) => void;
  updateMass: (id: string, patch: Partial<MassPoint>) => void;
  updateSettings: (patch: Partial<GravitySettings>) => void;
  requestLevelView: () => void;
};

const initialMasses: MassPoint[] = [
  {
    id: "mass-1",
    alias: "Mass 1",
    x: -2,
    y: 0,
    mass: 4,
    radius: 0.35,
    showSphere: true,
    showAlias: true,
    color: "#ffffff",
  },
  {
    id: "mass-2",
    alias: "Mass 2",
    x: 2,
    y: 0.8,
    mass: 3,
    radius: 0.3,
    showSphere: true,
    showAlias: true,
    color: "#ffffff",
  },
];

const initialSettings: GravitySettings = {
  gridSize: 10,
  segments: 100,
  strength: 0.75,
  softening: 0.55,
  maxDepth: 4.2,
  gridColor: "#28d7ff",
};

export const useGravityStore = create<GravityState>((set) => ({
  masses: initialMasses,
  settings: initialSettings,
  levelViewRequest: 0,
  addMass: () =>
    set((state) => {
      const nextIndex = state.masses.length + 1;
      const offset = (nextIndex % 3) - 1;

      return {
        masses: [
          ...state.masses,
          {
            id: `mass-${crypto.randomUUID()}`,
            alias: `Mass ${nextIndex}`,
            x: offset * 1.7,
            y: nextIndex % 2 === 0 ? -1.4 : 1.4,
            mass: 2.5,
            radius: 0.28,
            showSphere: true,
            showAlias: true,
            color: "#ffffff",
          },
        ],
      };
    }),
  removeMass: (id) =>
    set((state) => ({
      masses: state.masses.filter((mass) => mass.id !== id),
    })),
  updateMass: (id, patch) =>
    set((state) => ({
      masses: state.masses.map((mass) =>
        mass.id === id ? { ...mass, ...patch } : mass,
      ),
    })),
  updateSettings: (patch) =>
    set((state) => ({
      settings: { ...state.settings, ...patch },
    })),
  requestLevelView: () =>
    set((state) => ({
      levelViewRequest: state.levelViewRequest + 1,
    })),
}));
