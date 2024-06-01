import simplify from "simplify-js";

import type { Rune } from "../../types/Rune.js";
import type { RuneInput } from "../../types/RuneInput.js";
import { isOutOfBounds } from "./is-out-of-bounds.js";

export const handleMoveInput = ({
  rune,
  runeInput,
  timestamp,
}: {
  rune: Rune;
  runeInput: RuneInput;
  timestamp: number;
}) => {
  const outOfBounds = isOutOfBounds({
    height: rune.dimensions.height,
    thickness: rune.rendering.thickness,
    width: rune.dimensions.width,
    x: runeInput.touchPosition.x - rune.dimensions.left,
    y: runeInput.touchPosition.y - rune.dimensions.top,
  });

  if (outOfBounds) {
    rune.state = "outOfBounds";

    rune.outOfBounds.outOfBoundsAt = timestamp;

    return;
  }

  rune.state = undefined;

  rune.stylus.update(
    {
      x: runeInput.touchPosition.x - rune.dimensions.left,
      y: runeInput.touchPosition.y - rune.dimensions.top,
    },
    { friction: 0.01 },
  );

  const hasMoved = rune.stylus.brushHasMoved();

  if (!hasMoved) {
    return;
  }

  const { x, y } = rune.stylus.getBrushCoordinates();

  rune.vertices.push({ x, y });

  rune.rendering.vertices.push({ x, y });

  const simplifiedVertices = simplify(rune.vertices);

  rune.vertices = simplifiedVertices;

  rune.rendering.vertices = simplifiedVertices;

  return;
};
