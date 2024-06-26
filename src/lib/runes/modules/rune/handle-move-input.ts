import { mainEventBus } from "../../main-event-bus";
import { gameState } from "../../play";
import type { Rune } from "../../types/Rune.js";
import { isOutOfBounds } from "./is-out-of-bounds.js";

export const handleMoveInput = ({
  rune,
  timestamp,
}: {
  rune: Rune;
  timestamp: number;
}) => {
  const outOfBounds = isOutOfBounds({
    height: rune.dimensions.height,
    thickness: rune.rendering.thickness,
    width: rune.dimensions.width,
    x: rune.input.touchPosition.x - rune.dimensions.left,
    y: rune.input.touchPosition.y - rune.dimensions.top,
  });

  if (outOfBounds) {
    rune.outOfBounds.outOfBoundsAt ||= timestamp;

    return false;
  }

  rune.outOfBounds.outOfBoundsAt = undefined;

  rune.stylus.update(
    {
      x: rune.input.touchPosition.x - rune.dimensions.left,
      y: rune.input.touchPosition.y - rune.dimensions.top,
    },
    { friction: 0.01 },
  );

  const hasMoved = rune.stylus.brushHasMoved();

  if (!hasMoved) {
    return true;
  }

  const { x, y } = rune.stylus.getBrushCoordinates();

  if (gameState.stamina < 1) {
    return;
  }

  const vertex = { x: Math.round(x), y: Math.round(y) };

  mainEventBus && mainEventBus.emit("new-vertex", vertex);

  rune.vertices.push(vertex);

  rune.rendering.vertices.push(vertex);

  return true;
};
