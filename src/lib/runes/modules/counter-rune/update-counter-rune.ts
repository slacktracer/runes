import type { CounterRune } from "../../types/CounterRune";
import { resetInput } from "./reset-input";
import { updateHandlers } from "./update-handlers";

export const updateCounterRune = ({
  counterRune,
  timestamp,
}: {
  counterRune: CounterRune;
  timestamp: number;
}) => {
  const runeState = counterRune.state.getSnapshot()
    .value as keyof typeof updateHandlers;

  updateHandlers[runeState]({ counterRune, timestamp });

  resetInput({ counterRune });
};
