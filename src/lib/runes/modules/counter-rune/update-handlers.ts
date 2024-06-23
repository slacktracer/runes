import { carvingStateHandler } from "./carving-state-handler.js";
import { readyStateHandler } from "./ready-state-handler.js";
import { startedStateHandler } from "./started-state-handler.js";

export const updateHandlers = {
  carving: carvingStateHandler,
  ready: readyStateHandler,
  started: startedStateHandler,
};
