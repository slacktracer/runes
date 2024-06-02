import type { Rune } from "../../../types/Rune.js";
import type { RuneInput } from "../../../types/RuneInput.js";
import { handleMoveInput } from "../handle-move-input.js";

export const startedStateHandler = ({
  rune,
  runeInput,
  timestamp,
}: {
  rune: Rune;
  runeInput: RuneInput;
  timestamp: number;
}) => {
  if (runeInput.touchMove) {
    handleMoveInput({ rune, runeInput, timestamp });

    rune.state.send({ type: "move" });
  }
};
