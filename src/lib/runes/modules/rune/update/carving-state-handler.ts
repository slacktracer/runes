import type { Rune } from "../../../types/Rune.js";
import type { RuneInput } from "../../../types/RuneInput.js";
import { handleMoveInput } from "./handle-move-input.js";

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
    if (rune.vertices.length < 15) {
      rune.state.send({ type: "wasNotViable" });

      return;
    }

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
