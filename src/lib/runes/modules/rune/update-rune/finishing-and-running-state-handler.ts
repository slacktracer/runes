import type { Rune } from "../../../types/Rune.js";
import { launchRune } from "../launch-rune.js";

export const finishingAndRunningStateHandler = ({
  rune,
  timestamp,
}: {
  rune: Rune;
  timestamp: number;
}) => {
  if (rune.animations.running.isRunning === false) {
    rune.animations.running.isRunning = timestamp;

    return;
  }

  rune.animations.running.accumulator +=
    timestamp - rune.animations.running.isRunning;

  rune.animations.running.isRunning = timestamp;

  while (
    rune.rendering.vertices.length > 1 &&
    rune.animations.running.accumulator > 8
  ) {
    rune.rendering.vertices = rune.rendering.vertices.slice(
      1,
      rune.rendering.vertices.length,
    );

    rune.animations.running.accumulator -= 8;
  }

  if (rune.rendering.vertices.length <= 1) {
    rune.state.send({ type: "end" });

    launchRune({
      rune,
    });
  }
};
