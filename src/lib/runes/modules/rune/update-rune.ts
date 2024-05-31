import simplify from "simplify-js";

import type { Rune } from "../../types/Rune.js";
import { input } from "./input.js";
import { isOutOfBounds } from "./is-out-of-bounds.js";
import { launchRune } from "./launch-rune.js";
import { resetRune } from "./reset-rune.js";
import { runPreLaunchAnimation } from "./run-pre-launch-animation.js";

export const updateRune = ({
  rune,
  timestamp,
}: {
  rune: Rune;
  timestamp: number;
}) => {
  if (input.touchStart && rune.state !== "finishing") {
    input.touchStart = false;

    resetRune({ rune });

    rune.stylus.update(
      {
        x: input.touchPosition.x - rune.dimensions.left,
        y: input.touchPosition.y - rune.dimensions.top,
      },
      { both: true },
    );

    return;
  }

  if (input.touchMove && rune.state !== "finishing") {
    const outOfBounds = isOutOfBounds({
      height: rune.dimensions.height,
      thickness: rune.rendering.thickness,
      width: rune.dimensions.width,
      x: input.touchPosition.x - rune.dimensions.left,
      y: input.touchPosition.y - rune.dimensions.top,
    });

    if (outOfBounds) {
      return;
    }

    input.touchMove = false;

    rune.stylus.update(
      {
        x: input.touchPosition.x - rune.dimensions.left,
        y: input.touchPosition.y - rune.dimensions.top,
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
  }

  if (input.touchEnd) {
    input.touchEnd = false;

    const simplifiedVertices = simplify(rune.vertices);

    if (simplifiedVertices.length < 8) {
      resetRune({ rune });

      return;
    }

    rune.rendering.vertices = simplifiedVertices;
    rune.vertices = simplifiedVertices;

    rune.state = "finishing";
  }

  if (rune.state === "finishing") {
    runPreLaunchAnimation({ rune, timestamp });

    if (rune.rendering.vertices.length === 1) {
      rune.state = undefined;

      launchRune({
        rune,
      });
    }
  }
};
