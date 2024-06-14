import type { IncomingRune } from "../../../types/IncomingRune";

export const doneStateHandler = ({
  incomingRune,
  timestamp,
}: {
  incomingRune: IncomingRune;
  timestamp: number;
}) => {
  if (timestamp - incomingRune.done > 2000) {
    incomingRune.state.send({ type: "reset" });
  }
};
