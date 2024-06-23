import type { CounterRune } from "../../types/CounterRune";
import { makeInput } from "./make-input";

export const resetInput = ({ counterRune }: { counterRune: CounterRune }) => {
  Object.assign(counterRune.input, makeInput());
};
