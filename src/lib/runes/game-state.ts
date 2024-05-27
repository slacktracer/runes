import { makeRune } from "./modules/rune/make-rune.js";
import type { Rune } from "./types/Rune.js";

type GameState = {
  rune: Rune;
};

export const gameState: GameState = {
  rune: makeRune(),
};
