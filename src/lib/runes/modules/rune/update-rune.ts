import simplify from "simplify-js";

// import { launch } from "../../components/OPortal/launch.js";
import { runPreLaunchAnimation } from "../../components/OPortal/run-pre-launch-animation.js";
import type { Rune } from "../../types/Rune.js";
import { input } from "./input.js";
import { makeRune } from "./make-rune.js";

export const updateRune = ({ rune }: { rune: Rune; timestamp: number }) => {
  if (input.touchStart) {
    Object.assign(rune, makeRune({ dimensions: rune.dimensions }));

    rune.rendering.isRendering = true;

    const { x, y } = input.touchStartPosition;

    rune.stylus.update(
      { x: x - rune.dimensions.left, y: y - rune.dimensions.top },
      { both: true },
    );
  }

  if (input.touchMove) {
    const { x, y } = input.touchMovePosition;

    rune.stylus.update(
      { x: x - rune.dimensions.left, y: y - rune.dimensions.top },
      { friction: 0.1 },
    );

    const hasMoved = rune.stylus.brushHasMoved();

    if (!hasMoved) {
      return;
    }
  }

  if (input.touchEnd) {
    rune.rendering.isRendering = false;

    rune.vertices = simplify(rune.vertices);
  }

  if (input.touchStart || input.touchMove) {
    const { x: stylusX, y: stylusY } = rune.stylus.getBrushCoordinates();

    const distanceToBottom = rune.dimensions.height - stylusY;
    const distanceToLeft = stylusX;
    const distanceToRight = rune.dimensions.width - stylusX;
    const distanceToTop = stylusY;

    let outOfBounds = false;

    if (
      distanceToBottom < rune.rendering.width ||
      distanceToLeft < rune.rendering.width ||
      distanceToRight < rune.rendering.width ||
      distanceToTop < rune.rendering.width
    ) {
      outOfBounds = true;
    }

    if (outOfBounds) {
      return;
    }

    rune.vertices.push({ x: stylusX, y: stylusY });

    rune.rendering.vertices.push({ x: stylusX, y: stylusY });
  }

  if (input.touchEnd) {
    rune.rendering.didMove = false;

    input.touchEnd = false;

    runPreLaunchAnimation({ rune }).then(() => {
      rune.rendering.isRendering = false;
    });
    // launch({
    //   rune,
    // });
    return;
  }

  rune.rendering.didMove = true;

  if (input.touchStart) {
    input.touchStart = false;
  }

  if (input.touchMove) {
    input.touchMove = false;
  }
};
