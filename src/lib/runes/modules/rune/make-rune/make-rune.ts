import type { Rune } from "../../../types/Rune.js";
import { RUNE_LAZY_RADIUS } from "../../../values.js";
import { makeAnimations } from "./make-animations";
import { makeDimensions } from "./make-dimensions";
import { makeOutOfBounds } from "./make-out-of-bounds";
import { makeRendering } from "./make-rendering";
import { makeState } from "./make-state.js";
import { makeStylus } from "./make-stylus.js";

export const makeRune = ({ dimensions = makeDimensions() } = {}): Rune => ({
  animations: makeAnimations(),
  dimensions,
  outOfBounds: makeOutOfBounds(),
  rendering: makeRendering(),
  vertices: [],
  state: makeState().start(),
  stylus: makeStylus({ radius: RUNE_LAZY_RADIUS }),
});
