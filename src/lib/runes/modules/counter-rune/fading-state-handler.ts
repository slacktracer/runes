import type { CounterRune } from "../../types/CounterRune";
import { resetCounterRune } from "./reset-counter-rune";

export const fadingStateHandler = ({
  counterRune,
  timestamp,
}: {
  counterRune: CounterRune;
  timestamp: number;
}) => {
  if (counterRune.rendering.thickness === 1) {
    counterRune.state.send({ type: "end" });

    resetCounterRune({ counterRune });
  }

  counterRune.rendering.thickness -= 1;
};
