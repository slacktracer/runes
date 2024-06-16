import type { Rune } from "../../types/Rune.js";
import { resetInput } from "./reset-input";
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

  updateHandlers[runeState]({ rune, timestamp });

  resetInput({ rune });
};
