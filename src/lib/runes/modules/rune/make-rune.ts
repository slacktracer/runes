import { RUNE_LAZY_RADIUS } from "../../config/values.js";
import type { Rune } from "../../types/Rune.js";
import { makeAnimations } from "./make-animations";
import { makeDimensions } from "./make-dimensions";
import { makeInput } from "./make-input";
import { makeOutOfBounds } from "./make-out-of-bounds";
import { makeRendering } from "./make-rendering";
import { makeState } from "./make-state.js";
import { makeStylus } from "./make-stylus.js";

export const makeRune = ({
  dimensions = makeDimensions(),
  vertices = [],
} = {}): Rune => ({
  animations: makeAnimations(),
  dimensions,
  input: makeInput(),
  outOfBounds: makeOutOfBounds(),
  rendering: makeRendering({ vertices }),
  vertices,
  state: makeState().start(),
  stylus: makeStylus({ radius: RUNE_LAZY_RADIUS }),
});
