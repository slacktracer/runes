import { makeRune } from "./modules/rune/make-rune/make-rune.js";
import type { Rune } from "./types/Rune.js";

type GameState = {
  oRune: Rune;
  rune: Rune;
};

export const gameState: GameState = {
  oRune: makeRune(),
  rune: makeRune(),
};
