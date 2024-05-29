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
  if (
    (input.touchEnd || input.touchMove || input.touchStart) &&
    rune.state !== "finishing"
  ) {
    const outOfBounds = isOutOfBounds({
      height: rune.dimensions.height,
      margin: rune.rendering.thickness,
      width: rune.dimensions.width,
      x: input.touchPosition.x - rune.dimensions.left,
      y: input.touchPosition.y - rune.dimensions.top,
    });

    if (outOfBounds) {
      return;
    }

    if (input.touchStart) {
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

    if (input.touchMove) {
      input.touchMove = false;

      rune.stylus.update(
        {
          x: input.touchPosition.x - rune.dimensions.left,
          y: input.touchPosition.y - rune.dimensions.top,
        },
        { friction: 0.1 },
      );

      const hasMoved = rune.stylus.brushHasMoved();

      if (!hasMoved) {
        return;
      }
    }

    if (input.touchEnd) {
      input.touchEnd = false;

      const simplifiedVertices = simplify(rune.vertices);

      rune.rendering.vertices = simplifiedVertices;
      rune.vertices = simplifiedVertices;

      rune.state = "finishing";
    }

    const { x, y } = rune.stylus.getBrushCoordinates();

    rune.vertices.push({ x, y });

    rune.rendering.vertices.push({ x, y });
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
