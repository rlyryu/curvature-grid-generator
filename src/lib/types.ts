export type MassPoint = {
  id: string;
  alias: string;
  x: number;
  y: number;
  mass: number;
  radius: number;
  showSphere: boolean;
  showAlias: boolean;
  color?: string;
};

export type GravitySettings = {
  gridSize: number;
  segments: number;
  strength: number;
  softening: number;
  maxDepth: number;
  gridColor: string;
};
