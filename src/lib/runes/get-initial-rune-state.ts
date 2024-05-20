import { makeStylus } from "./make-stylus.js";
import type { Rune } from "./types/Rune.js";

export const getInitialRuneState = (): Rune => ({
  rendering: {
    colour: "hsla(46, 100%, 50%, 0.75)",
    didMove: false,
    isRendering: false,
    radius: 25,
    vertices: [],
    state: "",
  },
  vertices: [],
  stylus: makeStylus({ initialPoint: { x: 0, y: 0 } }),
});
