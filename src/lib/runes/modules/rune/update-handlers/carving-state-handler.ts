import type { Rune } from "../../../types/Rune.js";
import type { RuneInput } from "../../../types/RuneInput.js";
import { handleEndInput } from "../handle-end-input.js";
import { handleMoveInput } from "../handle-move-input.js";

export const carvingStateHandler = ({
  rune,
  runeInput,
  timestamp,
}: {
  rune: Rune;
  runeInput: RuneInput;
  timestamp: number;
}) => {
  if (runeInput.touchEnd) {
    handleEndInput({ rune });

    rune.state.send({ type: "end" });

    return;
  }

  if (runeInput.touchMove) {
    const withinBounds = handleMoveInput({ rune, runeInput, timestamp });

    if (withinBounds === false) {
      rune.state.send({ type: "wentOutOfBounds" });
    }
  }
};
