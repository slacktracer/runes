import { browser } from "$app/environment";

import { makeEventBus } from "./make-event-bus.js";

export const mainEventBus =
  browser && makeEventBus({ description: "main-event-bus" });
