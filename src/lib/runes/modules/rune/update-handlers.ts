import { carvingStateHandler } from "./carving-state-handler.js";
import { launchingStateHandler } from "./launching-state-handler";
import { outOfBoundsStateHandler } from "./out-of-bounds-state-handler.js";
import { readyStateHandler } from "./ready-state-handler.js";
import { runningStateHandler } from "./running-state-handler.js";
import { startedStateHandler } from "./started-state-handler.js";
import { witheringStateHandler } from "./withering-state-handler";

export const updateHandlers = {
  carving: carvingStateHandler,
  launching: launchingStateHandler,
  outOfBounds: outOfBoundsStateHandler,
  ready: readyStateHandler,
  running: runningStateHandler,
  started: startedStateHandler,
  withering: witheringStateHandler,
};
