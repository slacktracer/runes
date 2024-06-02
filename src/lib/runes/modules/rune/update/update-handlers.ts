import { carvingStateHandler } from "./carving-state-handler.js";
import { finishingStateHandler } from "./finishing-state-handler.js";
import { outOfBoundsStateHandler } from "./out-of-bounds-state-handler.js";
import { readyStateHandler } from "./ready-state-handler.js";
import { startedStateHandler } from "./started-state-handler.js";

export const updateHandlers = {
  carving: carvingStateHandler,
  finishing: finishingStateHandler,
  outOfBounds: outOfBoundsStateHandler,
  ready: readyStateHandler,
  started: startedStateHandler,
};
