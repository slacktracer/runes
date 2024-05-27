import type { HSLA } from "../HSLA.js";
import type { LazyBrush } from "./LazyBrush.js";
import type { Point } from "./Point.js";

export type Rune = {
  dimensions: { left: number; height: number; top: number; width: number };
  rendering: {
    colour: HSLA;
    didMove: boolean;
    isRendering: boolean;
    radius: number;
    shadowBlur: number;
    shadowColour: HSLA;
    state: string;
    vertices: Point[];
    width: number;
  };
  vertices: Point[];
  stylus: LazyBrush;
};
