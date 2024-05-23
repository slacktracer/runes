import { makeStylus } from "./make-stylus.js";
import type { Rune } from "./types/Rune.js";

export const getInitialRuneState = (): Rune => ({
  rendering: {
    colour: "hsla(46, 100%, 50%, 0.7)",
    didMove: false,
    isRendering: false,
    radius: 15,
    shadowColour: "hsla(46, 100%, 50%, 0.4)",
    shadowBlur: 8,
    state: "",
    vertices: [],
    width: 15,
  },
  vertices: [],
  stylus: makeStylus({ initialPoint: { x: 0, y: 0 } }),
});
