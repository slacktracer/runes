import type { CounterRune } from "../../types/CounterRune";
import { makeRendering } from "./make-rendering.js";

export const resetCounterRune = ({
  counterRune,
}: {
  counterRune: CounterRune;
}) => {
  counterRune.vertices.length = 0;

  return Object.assign(counterRune, {
    rendering: makeRendering(),
  });
};
