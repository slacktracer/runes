import { COUNTER_RUNE_MIN_THICKNESS } from "../../config/values";
import { mainEventBus } from "../../main-event-bus";
import type { CounterRune } from "../../types/CounterRune";
import { resetCounterRune } from "./reset-counter-rune";

export const fadingStateHandler = ({
  counterRune,
}: {
  counterRune: CounterRune;
  timestamp: number;
}) => {
  if (counterRune.input.touchEnd) {
    if (mainEventBus) {
      mainEventBus.emit("turn");

      return;
    }
  }

  if (counterRune.rendering.thickness === COUNTER_RUNE_MIN_THICKNESS) {
    counterRune.state.send({ type: "end" });

    resetCounterRune({ counterRune });
  }

  counterRune.rendering.thickness -= 1;
};
