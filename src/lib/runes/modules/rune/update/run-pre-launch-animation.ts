import type { Rune } from "../../../types/Rune.js";

export const runPreLaunchAnimation = ({
  rune,
  timestamp,
}: {
  rune: Rune;
  timestamp: number;
}) => {
  if (rune.rendering.runningPreLaunchAnimation === false) {
    rune.rendering.runningPreLaunchAnimation = timestamp;

    return;
  }

  rune.rendering.runningPreLaunchAnimationAccumulator +=
    timestamp - rune.rendering.runningPreLaunchAnimation;

  rune.rendering.runningPreLaunchAnimation = timestamp;

  while (
    rune.rendering.vertices.length > 1 &&
    rune.rendering.runningPreLaunchAnimationAccumulator > 16
  ) {
    rune.rendering.vertices = rune.rendering.vertices.slice(
      1,
      rune.rendering.vertices.length,
    );

    rune.rendering.runningPreLaunchAnimationAccumulator -= 16;
  }
};
