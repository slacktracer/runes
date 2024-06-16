import { RUNE_ANIMATIONS_RUNNING_ADD_ONE_VERTEX_EVERY_X_MILLISECONDS } from "../../config/values";
import type { IncomingRune } from "../../types/IncomingRune";

export const runningStateHandler = ({
  incomingRune,
  timestamp,
}: {
  incomingRune: IncomingRune;
  timestamp: number;
}) => {
  if (incomingRune.animations.running.isRunning === false) {
    incomingRune.animations.running.isRunning = timestamp;

    return;
  }

  incomingRune.animations.running.accumulator +=
    timestamp - incomingRune.animations.running.isRunning;

  incomingRune.animations.running.isRunning = timestamp;

  while (
    incomingRune.rendering.vertices.length < incomingRune.vertices.length &&
    incomingRune.animations.running.accumulator >
      RUNE_ANIMATIONS_RUNNING_ADD_ONE_VERTEX_EVERY_X_MILLISECONDS
  ) {
    const previousPoint = incomingRune.vertices.at(
      -incomingRune.rendering.vertices.length - 1,
    );

    if (previousPoint) {
      incomingRune.rendering.vertices.push(previousPoint);
    }

    incomingRune.animations.running.accumulator -=
      RUNE_ANIMATIONS_RUNNING_ADD_ONE_VERTEX_EVERY_X_MILLISECONDS;
  }

  if (incomingRune.rendering.vertices.length === incomingRune.vertices.length) {
    incomingRune.done = timestamp;

    incomingRune.state.send({ type: "done" });
  }
};
