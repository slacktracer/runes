import type { Rune } from "../../../types/Rune.js";
import { launchRune } from "../launch-rune.js";

export const finishingAndRunningStateHandler = ({
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
    rune.rendering.runningPreLaunchAnimationAccumulator > 8
  ) {
    rune.rendering.vertices = rune.rendering.vertices.slice(
      1,
      rune.rendering.vertices.length,
    );

    rune.rendering.runningPreLaunchAnimationAccumulator -= 8;
  }

  if (rune.rendering.vertices.length <= 1) {
    rune.state.send({ type: "end" });

    launchRune({
      rune,
    });
  }
};
