import { carvingStateHandler } from "./carving-state-handler.js";
import { finishingAndGrowingStateHandler } from "./finishing-and-growing-state-handler";
import { finishingAndRunningStateHandler } from "./finishing-and-running-state-handler.js";
import { finishingAndWitheringStateHandler } from "./finishing-and-withering-state-handler";
import { outOfBoundsStateHandler } from "./out-of-bounds-state-handler.js";
import { readyStateHandler } from "./ready-state-handler.js";
import { startedStateHandler } from "./started-state-handler.js";

export const updateHandlers = {
  carving: carvingStateHandler,
  finishingAndRunning: finishingAndRunningStateHandler,
  finishingAndGrowing: finishingAndGrowingStateHandler,
  finishingAndWithering: finishingAndWitheringStateHandler,
  outOfBounds: outOfBoundsStateHandler,
  ready: readyStateHandler,
  started: startedStateHandler,
};
