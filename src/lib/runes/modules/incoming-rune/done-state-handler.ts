import { local } from "../../local";
import type { IncomingRune } from "../../types/IncomingRune";

export const doneStateHandler = ({
  incomingRune,
  timestamp,
}: {
  incomingRune: IncomingRune;
  timestamp: number;
}) => {
  local.update((state) => {
    state.misses += incomingRune.vertices.length;

    return state;
  });

  if (timestamp - incomingRune.done > 2000) {
    incomingRune.state.send({ type: "reset" });
  }
};
