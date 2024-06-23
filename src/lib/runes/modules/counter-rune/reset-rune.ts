import type { Rune } from "../../types/Rune.js";
import { makeRendering } from "./make-rendering.js";

export const resetRune = ({ rune }: { rune: Rune }) => {
  rune.vertices.length = 0;

  return Object.assign(rune, {
    rendering: makeRendering(),
  });
};
