import type { CounterRune } from "../../types/CounterRune";
import { handleStartInput } from "./handle-start-input.js";

export const readyStateHandler = ({
  counterRune,
}: {
  counterRune: CounterRune;
}) => {
  if (counterRune.input.touchStart) {
    handleStartInput({ counterRune });

    counterRune.state.send({ type: "start" });
  }
};
