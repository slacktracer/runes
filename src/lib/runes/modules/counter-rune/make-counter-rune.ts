import { RUNE_LAZY_RADIUS } from "../../config/values.js";
import { makeStylus } from "../rune/make-stylus.js";
import { makeDimensions } from "./make-dimensions.js";
import { makeInput } from "./make-input.js";
import { makeRendering } from "./make-rendering.js";
import { makeState } from "./make-state.js";

export const makeCounterRune = () => {
  return {
    dimensions: makeDimensions(),
    input: makeInput(),
    rendering: makeRendering(),
    state: makeState().start(),
    stylus: makeStylus({ radius: RUNE_LAZY_RADIUS }),
    vertices: [],
  };
};
