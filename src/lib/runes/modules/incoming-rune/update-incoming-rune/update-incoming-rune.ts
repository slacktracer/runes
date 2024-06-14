import type { IncomingRune } from "../../../types/IncomingRune";
import { updateHandlers } from "./update-handlers.js";

export const updateIncomingRune = ({
  incomingRune,
  timestamp,
}: {
  incomingRune: IncomingRune;
  timestamp: number;
}) => {
  const incomingRuneState = incomingRune.state.getSnapshot()
    .value as keyof typeof updateHandlers;

  updateHandlers[incomingRuneState]({ incomingRune, timestamp });
};
