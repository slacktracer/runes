import simplify from "simplify-js";

import type { Rune } from "../../types/Rune.js";

export const handleTouchEndInput = ({ rune }: { rune: Rune }) => {
  const simplifiedVertices = simplify(rune.vertices);

  if (simplifiedVertices.length < 4) {
    return;
  }

  rune.rendering.vertices = simplifiedVertices;

  rune.vertices = simplifiedVertices;

  rune.state = "finishing";
};
