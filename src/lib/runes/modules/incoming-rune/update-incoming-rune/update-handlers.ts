import { doneStateHandler } from "./done-state-handler";
import { landingStateHandler } from "./landing-state-handler.js";
import { runningStateHandler } from "./running-state-handler";

export const updateHandlers = {
  done: doneStateHandler,
  landing: landingStateHandler,
  ready: () => {},
  running: runningStateHandler,
};
