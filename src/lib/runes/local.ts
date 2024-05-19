import { writable } from "svelte/store";

import { makeStylus } from "./make-stylus.js";
import type { LazyBrush } from "./types/LazyBrush.js";
import type { Point } from "./types/Point.js";

type LocalState = {
  carvingCoolDown: number;
  carvingEnergy: number;
  carvingStarted: number;
  counterRune: Point[];
  counterRuneColour: string;
  counterStylus: LazyBrush;
  isBeingCarved: boolean;
  rune: Point[];
  runeColour: string;
  incomingRune: Point[][];
  incomingRuneColour: string;
  runeFinished: boolean;
  stylus: LazyBrush;
};

export const local = writable<LocalState>({
  carvingCoolDown: 0,
  carvingEnergy: 2500,
  carvingStarted: 0,
  counterRune: [],
  counterRuneColour: "hsla(178, 100%, 50%, 0.5)",
  counterStylus: makeStylus({ initialPoint: { x: 0, y: 0 }, radius: 0 }),
  isBeingCarved: false,
  rune: [],
  runeColour: "hsla(46, 100%, 50%, 1)",
  incomingRune: [],
  incomingRuneColour: "hsla(355, 100%, 50%, 1)",
  runeFinished: false,
  stylus: makeStylus({ initialPoint: { x: 0, y: 0 } }),
});
