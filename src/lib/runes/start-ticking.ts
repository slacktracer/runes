import type { EventBus } from "./types/EventBus";

const iterationInterval = 16;

let accumulator = 0;
let previousTimestamp: number;
let requestAnimationFrameID = 0;

export const startTicking = ({ eventBus }: { eventBus: EventBus }) => {
  const tick = (timestamp: number) => {
    const timeSinceLastFrame = Math.min(
      previousTimestamp ? timestamp - previousTimestamp : iterationInterval,
      34,
    );

    previousTimestamp = timestamp;

    accumulator += timeSinceLastFrame;

    while (accumulator >= iterationInterval) {
      eventBus.emit("tick", timestamp);

      accumulator -= iterationInterval;
    }

    requestAnimationFrameID = requestAnimationFrame(tick);
  };

  requestAnimationFrameID = requestAnimationFrame(tick);

  return () => cancelAnimationFrame(requestAnimationFrameID);
};
