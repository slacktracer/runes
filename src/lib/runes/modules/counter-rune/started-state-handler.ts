import { mainEventBus } from "../../main-event-bus";
import type { CounterRune } from "../../types/CounterRune";
import { handleMoveInput } from "./handle-move-input.js";

export const startedStateHandler = ({
  counterRune,
  timestamp,
}: {
  counterRune: CounterRune;
  timestamp: number;
}) => {
  if (counterRune.input.touchMove) {
    handleMoveInput({ counterRune, timestamp });

    counterRune.state.send({ type: "move" });
  }

  if (counterRune.input.touchEnd) {
    if (mainEventBus) {
      mainEventBus.emit("turn");

      return;
    }
  }
};
