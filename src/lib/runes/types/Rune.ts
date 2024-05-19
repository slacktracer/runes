import type { LazyBrush } from "./LazyBrush.js";
import type { Point } from "./Point.js";

export type Rune = {
  colour: string;
  simplifiedVertices: Point[];
  state: string;
  stylus: LazyBrush;
  vertices: Point[];
};
