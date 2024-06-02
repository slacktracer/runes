import type { Rune } from "../../../types/Rune.js";
import { launchRune } from "../launch-rune.js";
import { resetRune } from "../reset-rune.js";
import { runPreLaunchAnimation } from "../run-pre-launch-animation.js";

export const finishingStateHandler = ({
  rune,
  timestamp,
}: {
  rune: Rune;
  timestamp: number;
}) => {
  runPreLaunchAnimation({ rune, timestamp });

  if (rune.rendering.vertices.length <= 1) {
    resetRune({ rune });

    launchRune({
      rune,
    });
  }
};
