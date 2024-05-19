import type { LazyBrush } from "./LazyBrush.js";
import type { Point } from "./Point.js";

export type Rune = {
  colour: string;
  state: string;
  stylus: LazyBrush;
  vertices: Point[];
};
