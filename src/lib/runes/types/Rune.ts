import type { LazyBrush } from "./LazyBrush.js";
import type { Point } from "./Point.js";

export type Rune = {
  rendering: {
    colour: string;
    didMove: boolean;
    isRendering: boolean;
    radius: number;
    state: string;
    vertices: Point[];
  };
  vertices: Point[];
  stylus: LazyBrush;
};
