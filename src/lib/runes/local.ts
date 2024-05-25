import { writable } from "svelte/store";

import { getInitialRuneState } from "./get-initial-rune-state.js";
import { makeStylus } from "./make-stylus.js";
import type { LazyBrush } from "./types/LazyBrush.js";
import type { Rune } from "./types/Rune.js";

type LocalState = {
  counterStylus: LazyBrush;
  rune: Rune;
};

export const local = writable<LocalState>({
  counterStylus: makeStylus({ initialPoint: { x: 0, y: 0 }, radius: 0 }),
  rune: getInitialRuneState(),
});
