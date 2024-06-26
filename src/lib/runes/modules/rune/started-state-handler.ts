import { mainEventBus } from "../../main-event-bus";
import type { Rune } from "../../types/Rune.js";
import { handleMoveInput } from "./handle-move-input.js";

export const startedStateHandler = ({
  rune,
  timestamp,
}: {
  rune: Rune;
  timestamp: number;
}) => {
  if (rune.input.touchMove) {
    handleMoveInput({ rune, timestamp });

    rune.state.send({ type: "move" });
  }

  if (rune.input.touchEnd) {
    if (mainEventBus) {
      mainEventBus.emit("turn");

      return;
    }
  }
};
