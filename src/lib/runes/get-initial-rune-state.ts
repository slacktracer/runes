import { HSLA } from "./HSLA.js";
import { makeStylus } from "./make-stylus.js";
import type { Rune } from "./types/Rune.js";

export const getInitialRuneState = (): Rune => ({
  rendering: {
    colour: new HSLA({ h: 46, s: 100, l: 50, a: 0.7 }),
    didMove: false,
    isRendering: false,
    radius: 15,
    shadowColour: new HSLA({ h: 46, s: 100, l: 50, a: 0.4 }),
    shadowBlur: 10,
    state: "",
    vertices: [],
    width: 15,
  },
  vertices: [],
  stylus: makeStylus({ initialPoint: { x: 0, y: 0 } }),
});
