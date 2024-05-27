import { mainEventBus } from "./main-event-bus.js";

const iterationInterval = 16;

let accumulator = 0;
let previousTimestamp: number;
let requestAnimationFrameID = 0;

const tick = (timestamp: number) => {
  if (!mainEventBus) {
    return;
  }

  const timeSinceLastFrame = Math.min(
    previousTimestamp ? timestamp - previousTimestamp : iterationInterval,
    34,
  );

  previousTimestamp = timestamp;

  accumulator += timeSinceLastFrame;

  while (accumulator >= iterationInterval) {
    mainEventBus.emit("tick", timestamp);

    accumulator -= iterationInterval;
  }

  requestAnimationFrameID = requestAnimationFrame(tick);
};

export const startTicking = () => {
  requestAnimationFrameID = requestAnimationFrame(tick);

  return () => cancelAnimationFrame(requestAnimationFrameID);
};
