import type { CounterRune } from "../../types/CounterRune";
import { handleMoveInput } from "./handle-move-input.js";

export const carvingStateHandler = ({
  counterRune,
  timestamp,
}: {
  counterRune: CounterRune;
  timestamp: number;
}) => {
  if (counterRune.input.touchEnd) {
    counterRune.state.send({ type: "end" });

    return;
  }

  // simulating the idea
  if (counterRune.vertices.length > 5) {
    counterRune.rendering.vertices.shift();
  }

  if (counterRune.input.touchMove) {
    handleMoveInput({ counterRune, timestamp });
  }
};
