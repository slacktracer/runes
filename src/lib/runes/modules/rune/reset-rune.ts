import type { Rune } from "../../types/Rune.js";
import { makeRune } from "./make-rune/make-rune.js";

export const resetRune = ({ rune }: { rune: Rune }) =>
  Object.assign(rune, makeRune({ dimensions: rune.dimensions }));
