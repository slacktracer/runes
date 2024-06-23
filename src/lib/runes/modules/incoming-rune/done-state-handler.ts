import { local } from "../../local";
import type { IncomingRune } from "../../types/IncomingRune";

export const doneStateHandler = ({
  incomingRune,
  timestamp,
}: {
  incomingRune: IncomingRune;
  timestamp: number;
}) => {
  if (timestamp - incomingRune.done > 2000) {
    local.update((state) => {
      state.misses += incomingRune.vertices.length;

      return state;
    });

    incomingRune.state.send({ type: "reset" });
  }
};
