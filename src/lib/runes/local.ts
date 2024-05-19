import { writable } from "svelte/store";

import { makeStylus } from "./make-stylus.js";
import type { LazyBrush } from "./types/LazyBrush.js";
import type { Point } from "./types/Point.js";
import type { Rune } from "./types/Rune.js";

type LocalState = {
  counterRune: Point[];
  counterRuneColour: string;
  counterStylus: LazyBrush;
  rune: Rune;
  incomingRune: Point[][];
  incomingRuneColour: string;
};

export const local = writable<LocalState>({
  counterRune: [],
  counterRuneColour: "hsla(178, 100%, 50%, 0.5)",
  counterStylus: makeStylus({ initialPoint: { x: 0, y: 0 }, radius: 0 }),
  rune: {
    rendering: {
      colour: "hsla(46, 100%, 50%, 0.75)",
      radius: 25,
      vertices: [],
      state: "",
    },
    vertices: [],
    stylus: makeStylus({ initialPoint: { x: 0, y: 0 } }),
  },
  incomingRune: [],
  incomingRuneColour: "hsla(355, 100%, 50%, 1)",
});
