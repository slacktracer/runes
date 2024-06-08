import type { Rune } from "../../../types/Rune.js";
import type { RuneInput } from "../../../types/RuneInput.js";
import { handleMoveInput } from "./handle-move-input.js";
import { handleOutOfBoundsState } from "./handle-out-of-bounds-state.js";

export const outOfBoundsStateHandler = ({
  rune,
  runeInput,
  timestamp,
}: {
  rune: Rune;
  runeInput: RuneInput;
  timestamp: number;
}) => {
  if (runeInput.touchMove) {
    const withinBounds = handleMoveInput({ rune, runeInput, timestamp });

    if (withinBounds === true) {
      rune.state.send({ type: "backWithinBounds" });

      return;
    }
  }

  const timeout = handleOutOfBoundsState({ rune, timestamp });

  if (timeout) {
    rune.state.send({ type: "end" });
  }
};
