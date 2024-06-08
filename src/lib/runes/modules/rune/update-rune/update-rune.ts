import type { Rune } from "../../../types/Rune.js";
import { resetRuneInput } from "../reset-rune-input.js";
import { runeInput } from "../rune-input.js";
import { updateHandlers } from "./update-handlers.js";

export const updateRune = ({
  rune,
  timestamp,
}: {
  rune: Rune;
  timestamp: number;
}) => {
  const runeState = rune.state.getSnapshot()
    .value as keyof typeof updateHandlers;

  updateHandlers[runeState]({ rune, runeInput, timestamp });

  resetRuneInput({ runeInput });
};
