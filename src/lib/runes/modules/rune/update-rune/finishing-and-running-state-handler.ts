import {
  RUNE_ANIMATIONS_RUNNING_LEAVE_X_VERTICES,
  RUNE_ANIMATIONS_RUNNING_REMOVE_ONE_VERTEX_EVERY_X_MILLISECONDS,
} from "../../../config/values";
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
    rune.rendering.vertices.length > RUNE_ANIMATIONS_RUNNING_LEAVE_X_VERTICES &&
    rune.animations.running.accumulator >
      RUNE_ANIMATIONS_RUNNING_REMOVE_ONE_VERTEX_EVERY_X_MILLISECONDS
  ) {
    rune.rendering.vertices = rune.rendering.vertices.slice(
      1,
      rune.rendering.vertices.length,
    );

    rune.animations.running.accumulator -=
      RUNE_ANIMATIONS_RUNNING_REMOVE_ONE_VERTEX_EVERY_X_MILLISECONDS;
  }

  if (
    rune.rendering.vertices.length <= RUNE_ANIMATIONS_RUNNING_LEAVE_X_VERTICES
  ) {
    rune.state.send({ type: "end" });

    launchRune({
      rune,
    });
  }
};
