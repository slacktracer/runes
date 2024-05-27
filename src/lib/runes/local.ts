import { writable } from "svelte/store";

import { makeStylus } from "./make-stylus.js";
import type { LazyBrush } from "./types/LazyBrush.js";

type LocalState = {
  counterStylus: LazyBrush;
};

export const local = writable<LocalState>({
  counterStylus: makeStylus({ initialPoint: { x: 0, y: 0 }, radius: 0 }),
});
