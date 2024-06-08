import type { Rune } from "../../types/Rune.js";
import { makeAnimations } from "./make-rune/make-animations";
import { makeOutOfBounds } from "./make-rune/make-out-of-bounds";
import { makeRendering } from "./make-rune/make-rendering";

export const resetRune = ({ rune }: { rune: Rune }) => {
  rune.vertices.length = 0;

  return Object.assign(rune, {
    animations: makeAnimations(),
    outOfBounds: makeOutOfBounds(),
    rendering: makeRendering(),
  });
};
