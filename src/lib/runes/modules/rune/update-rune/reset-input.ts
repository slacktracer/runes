import type { Rune } from "../../../types/Rune";
import { makeInput } from "../make-rune/make-input";

export const resetInput = ({ rune }: { rune: Rune }) => {
  Object.assign(rune.input, makeInput());
};
