import type { Rune } from "../../types/Rune.js";
import { handleEndInput } from "./handle-end-input.js";
import { handleMoveInput } from "./handle-move-input.js";
import { handleOutOfBoundsState } from "./handle-out-of-bounds-state.js";
import { handleStartInput } from "./handle-start-input.js";
import { launchRune } from "./launch-rune.js";
import { resetInput } from "./reset-input.js";
import { resetRune } from "./reset-rune.js";
import { runPreLaunchAnimation } from "./run-pre-launch-animation.js";
import { runeInput } from "./rune-input.js";

export const updateRune = ({
  rune,
  timestamp,
}: {
  rune: Rune;
  timestamp: number;
}) => {
  if (rune.state === "finishing") {
    resetInput({ runeInput });

    runPreLaunchAnimation({ rune, timestamp });

    if (rune.rendering.vertices.length <= 1) {
      rune.state = undefined;

      launchRune({
        rune,
      });
    }

    resetInput({ runeInput });

    return;
  }

  if (rune.state === "outOfBounds") {
    if (rune.outOfBounds.outOfBoundsAt) {
      resetInput({ runeInput });

      runeInput.touchEnd = handleOutOfBoundsState({ rune, timestamp });

      return;
    }

    console.error("outOfBoundsAt is falsy");

    return;
  }

  if (runeInput.touchEnd) {
    handleEndInput({ rune });

    resetInput({ runeInput });

    return;
  }

  if (runeInput.touchStart) {
    resetRune({ rune });

    handleStartInput({ rune });

    resetInput({ runeInput });

    return;
  }

  if (runeInput.touchMove) {
    handleMoveInput({ rune, runeInput, timestamp });

    resetInput({ runeInput });
  }
};
