import { makeCounterRune } from "./modules/counter-rune/make-counter-rune";
import { makeRune } from "./modules/rune/make-rune.js";
import type { CounterRune } from "./types/CounterRune.js";
import type { IncomingRune } from "./types/IncomingRune";
import type { Rune } from "./types/Rune.js";

type GameState = {
  canvasHeight: number;
  canvasWidth: number;
  counterRune: CounterRune;
  renderingContextA: CanvasRenderingContext2D | undefined;
  renderingContextB: CanvasRenderingContext2D | undefined;
  rune: Rune;
  stamina: number;
  theirRunes: IncomingRune[];
};

export const gameState: GameState = {
  canvasHeight: 500,
  canvasWidth: 320,
  counterRune: makeCounterRune(),
  renderingContextA: undefined,
  renderingContextB: undefined,
  rune: makeRune(),
  stamina: 60,
  theirRunes: [],
};
