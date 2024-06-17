import { burningStateHandler } from "./burning-state-handler";
import { doneStateHandler } from "./done-state-handler";
import { hittingStateHandler } from "./hitting-state-handler";
import { landingStateHandler } from "./landing-state-handler.js";
import { runningStateHandler } from "./running-state-handler";

export const updateHandlers = {
  burning: burningStateHandler,
  done: doneStateHandler,
  hitting: hittingStateHandler,
  landing: landingStateHandler,
  ready: () => {},
  running: runningStateHandler,
};
