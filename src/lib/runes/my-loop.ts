import { Tween } from "@tweenjs/tween.js";

import { browser } from "$app/environment";

const currentState = { radius: 1000 };

const radiusTween = new Tween(currentState);

radiusTween.to({ radius: 0 }, 500);

const iterationInterval = 16;

let accumulator = 0;
let previousTimestamp: number;

const start = Date.now();

radiusTween.start(performance.now());

function step(timestamp: number) {
  const timeSinceLastFrame = Math.min(
    previousTimestamp ? timestamp - previousTimestamp : iterationInterval,
    25,
  );

  previousTimestamp = timestamp;

  accumulator += timeSinceLastFrame;

  while (accumulator >= iterationInterval) {
    radiusTween.update(previousTimestamp + iterationInterval);

    accumulator -= iterationInterval;
  }

  radiusTween.update(timestamp);

  console.log(currentState);

  const stateToRender = Math.round(currentState.radius);

  if (Date.now() - start < 1000) {
    requestAnimationFrame(step);
  } else {
    console.log({ currentState, stateToRender });
  }
}

if (browser) {
  requestAnimationFrame(step);
}
