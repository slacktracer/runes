import type { Rune } from "../../../types/Rune.js";

export const handleEndInput = ({ rune }: { rune: Rune }) => {
  if (rune.vertices.length < 4) {
    rune.vertices.length = 0;

    rune.rendering.vertices.length = 0;

    return;
  }
};
