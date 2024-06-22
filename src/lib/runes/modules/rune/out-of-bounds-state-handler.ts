import type { Rune } from "../../types/Rune.js";
import { normaliseRune } from "../normalise-rune";
import { handleMoveInput } from "./handle-move-input.js";
import { handleOutOfBoundsState } from "./handle-out-of-bounds-state.js";

export const outOfBoundsStateHandler = ({
  rune,
  timestamp,
}: {
  rune: Rune;
  timestamp: number;
}) => {
  if (rune.input.touchMove) {
    const withinBounds = handleMoveInput({ rune, timestamp });

    if (withinBounds === true) {
      rune.state.send({ type: "backWithinBounds" });

      return;
    }
  }

  const timeout = handleOutOfBoundsState({ rune, timestamp });

  if (timeout) {
    normaliseRune({ rune });

    rune.state.send({ type: "end" });
  }
};
