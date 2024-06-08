import type { Rune } from "../../../types/Rune.js";
import { makeAnimations } from "./make-animations";
import { makeDimensions } from "./make-dimensions";
import { makeOutOfBounds } from "./make-out-of-bounds";
import { makeRendering } from "./make-rendering";
import { makeState } from "./make-state.js";
import { makeStylus } from "./make-stylus.js";

export const makeRune = ({ dimensions = makeDimensions() } = {}): Rune => ({
  dimensions,
  animations: makeAnimations(),
  outOfBounds: makeOutOfBounds(),
  rendering: makeRendering(),
  vertices: [],
  state: makeState().start(),
  stylus: makeStylus({ initialPoint: { x: 0, y: 0 }, radius: 5 }),
});
