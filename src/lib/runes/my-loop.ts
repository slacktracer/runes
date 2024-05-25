import { browser } from "$app/environment";

const alpha = 0.005;
const iterationInterval = 16;

let currentState = 100;

let accumulator = 0;
let previousTimestamp: number;

const lerp = ({
  alpha,
  end,
  start,
}: {
  alpha: number;
  end: number;
  start: number;
}) => {
  return start * (1 - alpha) + end * alpha;
};

const start = Date.now();

let frames = 0;
let iterations = 0;

function step(timestamp: number) {
  frames += 1;

  const timeSinceLastFrame = Math.min(
    previousTimestamp ? timestamp - previousTimestamp : iterationInterval,
    25,
  );

  previousTimestamp = timestamp;

  accumulator += timeSinceLastFrame;

  while (accumulator >= iterationInterval) {
    iterations += 1;

    currentState = lerp({ alpha: alpha, end: 0, start: currentState });

    accumulator -= iterationInterval;
  }

  const stateToRender = Math.round(
    lerp({
      alpha: (accumulator / iterationInterval) * alpha,
      end: 0,
      start: currentState,
    }),
  );

  if (Date.now() - start < 1000) {
    requestAnimationFrame(step);
  } else {
    console.log({ frames, iterations, currentState, stateToRender });
  }
}

if (browser) {
  requestAnimationFrame(step);
}
