import { carvingStateHandler } from "./carving-state-handler.js";
import { fadingStateHandler } from "./fading-state-handler";
import { readyStateHandler } from "./ready-state-handler.js";
import { startedStateHandler } from "./started-state-handler.js";

export const updateHandlers = {
  carving: carvingStateHandler,
  fading: fadingStateHandler,
  ready: readyStateHandler,
  started: startedStateHandler,
};
