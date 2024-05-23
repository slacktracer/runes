import type { LazyBrush } from "./LazyBrush.js";
import type { Point } from "./Point.js";

export type Rune = {
  rendering: {
    colour: string;
    didMove: boolean;
    isRendering: boolean;
    radius: number;
    shadowBlur: number;
    shadowColour: string;
    state: string;
    vertices: Point[];
    width: number;
  };
  vertices: Point[];
  stylus: LazyBrush;
};
