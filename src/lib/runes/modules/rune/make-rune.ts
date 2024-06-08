import { HSLA } from "../../HSLA.js";
import { makeStylus } from "../../make-stylus.js";
import type { Rune } from "../../types/Rune.js";
import { makeRuneState } from "./make-rune-state.js";

export const makeRune = ({
  dimensions = { left: 0, height: 500, top: 0, width: 320 },
} = {}): Rune => ({
  dimensions,
  outOfBounds: {
    isOutOfBounds: false,
    maxTimeOutOfBounds: 500,
    outOfBoundsAt: undefined,
  },
  rendering: {
    animations: {
      transmitting: {
        duration: 250,
        from: { opacity: 0.7, radius: 15 },
        to: {
          opacity: 0,
          radius: ({ rune }) => rune.vertices.length * 3,
        },
        tween: false,
      },
      withering: {
        duration: 250,
        from: { saturation: 100, thickness: 15 },
        to: { saturation: 0, thickness: 0 },
        tween: false,
      },
    },
    colour: new HSLA({ h: 46, s: 100, l: 50, a: 0.7 }),
    radius: 15,
    runningPreLaunchAnimation: false,
    runningPreLaunchAnimationAccumulator: 0,
    shadowColour: new HSLA({ h: 46, s: 100, l: 50, a: 0.4 }),
    shadowBlur: 10,
    thickness: 15,
    vertices: [],
  },
  vertices: [],
  state: makeRuneState().start(),
  stylus: makeStylus({ initialPoint: { x: 0, y: 0 }, radius: 5 }),
});
