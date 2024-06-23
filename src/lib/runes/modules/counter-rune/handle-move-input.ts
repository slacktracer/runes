import simplify from "simplify-js";

import type { CounterRune } from "../../types/CounterRune";

export const handleMoveInput = ({
  counterRune,
}: {
  counterRune: CounterRune;
  timestamp: number;
}) => {
  counterRune.stylus.update(
    {
      x: counterRune.input.touchPosition.x - counterRune.dimensions.left,
      y: counterRune.input.touchPosition.y - counterRune.dimensions.top,
    },
    { friction: 0.01 },
  );

  const hasMoved = counterRune.stylus.brushHasMoved();

  if (!hasMoved) {
    return true;
  }

  const { x, y } = counterRune.stylus.getBrushCoordinates();

  const updatedVertices = counterRune.vertices.concat([{ x, y }]);

  counterRune.vertices = updatedVertices;

  counterRune.rendering.vertices = updatedVertices;

  return true;
};
