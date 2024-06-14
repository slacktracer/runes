import { makeRune } from "./modules/rune/make-rune/make-rune.js";
import type { IncomingRune } from "./types/IncomingRune";
import type { Rune } from "./types/Rune.js";

type GameState = {
  canvasHeight: number;
  canvasWidth: number;
  oRune: Rune;
  renderingContextA: CanvasRenderingContext2D | undefined;
  renderingContextB: CanvasRenderingContext2D | undefined;
  rune: Rune;
  theirRunes: IncomingRune[];
};

export const gameState: GameState = {
  canvasHeight: 500,
  canvasWidth: 320,
  oRune: makeRune(),
  renderingContextA: undefined,
  renderingContextB: undefined,
  rune: makeRune(),
  theirRunes: [],
};
