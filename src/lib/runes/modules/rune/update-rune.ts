import type { Rune } from "../../types/Rune.js";
import { handleEndInput } from "./handle-end-input.js";
import { handleMoveInput } from "./handle-move-input.js";
import { handleOutOfBoundsState } from "./handle-out-of-bounds-state.js";
import { handleStartInput } from "./handle-start-input.js";
import { launchRune } from "./launch-rune.js";
import { resetRune } from "./reset-rune.js";
import { resetRuneInput } from "./reset-rune-input.js";
import { runPreLaunchAnimation } from "./run-pre-launch-animation.js";
import { runeInput } from "./rune-input.js";

export const updateRune = ({
  rune,
  timestamp,
}: {
  rune: Rune;
  timestamp: number;
}) => {
  const runeState = rune.state.getSnapshot().value;

  switch (runeState) {
    case "ready":
      if (runeInput.touchStart) {
        handleStartInput({ rune });

        rune.state.send({ type: "start" });
      }

      break;

    case "started":
      if (runeInput.touchMove) {
        handleMoveInput({ rune, runeInput, timestamp });

        rune.state.send({ type: "move" });
      }

      break;

    case "carving":
      if (runeInput.touchEnd) {
        handleEndInput({ rune });

        rune.state.send({ type: "end" });
      }

      if (runeInput.touchMove) {
        const withinBounds = handleMoveInput({ rune, runeInput, timestamp });

        if (withinBounds === false) {
          rune.state.send({ type: "wentOutOfBounds" });
        }
      }

      break;

    case "outOfBounds":
      if (runeInput.touchMove) {
        const withinBounds = handleMoveInput({ rune, runeInput, timestamp });

        if (withinBounds === true) {
          rune.state.send({ type: "backWithinBounds" });

          break;
        }
      }

      {
        const timeout = handleOutOfBoundsState({ rune, timestamp });

        if (timeout) {
          rune.state.send({ type: "end" });
        }

        break;
      }
    case "finishing":
      runPreLaunchAnimation({ rune, timestamp });

      if (rune.rendering.vertices.length <= 1) {
        resetRune({ rune });

        launchRune({
          rune,
        });
      }

      break;
  }

  resetRuneInput({ runeInput });
};
