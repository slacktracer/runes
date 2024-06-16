import { makeRune } from "./modules/rune/make-rune.js";
import type { IncomingRune } from "./types/IncomingRune";
import type { Rune } from "./types/Rune.js";

type GameState = {
  canvasHeight: number;
  canvasWidth: number;
  renderingContextA: CanvasRenderingContext2D | undefined;
  renderingContextB: CanvasRenderingContext2D | undefined;
  rune: Rune;
  theirRunes: IncomingRune[];
};

export const gameState: GameState = {
  canvasHeight: 500,
  canvasWidth: 320,
  renderingContextA: undefined,
  renderingContextB: undefined,
  rune: makeRune(),
  theirRunes: [],
};
