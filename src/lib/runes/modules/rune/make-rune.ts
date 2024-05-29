import { HSLA } from "../../HSLA.js";
import { makeStylus } from "../../make-stylus.js";
import type { Rune } from "../../types/Rune.js";

export const makeRune = ({
  dimensions = { left: 0, height: 500, top: 0, width: 320 },
} = {}): Rune => ({
  dimensions,
  rendering: {
    colour: new HSLA({ h: 46, s: 100, l: 50, a: 0.7 }),
    radius: 15,
    runningPreLaunchAnimation: false,
    runningPreLaunchAnimationAccumulator: 0,
    shadowColour: new HSLA({ h: 46, s: 100, l: 50, a: 0.4 }),
    shadowBlur: 10,
    state: "",
    thickness: 15,
    vertices: [],
  },
  vertices: [],
  state: undefined,
  stylus: makeStylus({ initialPoint: { x: 0, y: 0 } }),
});