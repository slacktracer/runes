import { makeRune } from "./modules/rune/make-rune/make-rune.js";
import type { IncomingRune } from "./types/IncomingRune";
import type { Rune } from "./types/Rune.js";

type GameState = {
  oRune: Rune;
  rune: Rune;
  theirRunes: IncomingRune[];
};

export const gameState: GameState = {
  oRune: makeRune(),
  rune: makeRune(),
  theirRunes: [],
};
