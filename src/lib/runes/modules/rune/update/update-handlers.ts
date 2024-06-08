import { carvingStateHandler } from "./carving-state-handler.js";
import { finishingAndRunningStateHandler } from "./finishing-and-running-state-handler.js";
import { finishingAndTransmittingStateHandler } from "./finishing-and-transmitting-state-handler";
import { outOfBoundsStateHandler } from "./out-of-bounds-state-handler.js";
import { readyStateHandler } from "./ready-state-handler.js";
import { startedStateHandler } from "./started-state-handler.js";

export const updateHandlers = {
  carving: carvingStateHandler,
  finishingAndRunning: finishingAndRunningStateHandler,
  finishingAndTransmitting: finishingAndTransmittingStateHandler,
  outOfBounds: outOfBoundsStateHandler,
  ready: readyStateHandler,
  started: startedStateHandler,
};
