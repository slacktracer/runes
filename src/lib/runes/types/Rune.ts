import type { HSLA } from "../HSLA.js";
import type { LazyBrush } from "./LazyBrush.js";
import type { Point } from "./Point.js";

export type Rune = {
  dimensions: { left: number; height: number; top: number; width: number };
  rendering: {
    colour: HSLA;
    radius: number;
    runningPreLaunchAnimation: false | number;
    runningPreLaunchAnimationAccumulator: number;
    shadowBlur: number;
    shadowColour: HSLA;
    state: string;
    thickness: number;
    vertices: Point[];
  };
  vertices: Point[];
  state: undefined | "starting" | "carving" | "finishing";
  stylus: LazyBrush;
};
