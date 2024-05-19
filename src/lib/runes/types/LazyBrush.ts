import type { Point } from "./Point.js";

export type LazyBrush = {
  brushHasMoved: () => boolean;
  getBrushCoordinates: () => Point;
  update: (point: Point, options: { both?: true; friction?: number }) => void;
};
