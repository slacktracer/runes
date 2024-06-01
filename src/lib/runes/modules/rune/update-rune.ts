import type { Rune } from "../../types/Rune.js";
import { handleTouchEndInput } from "./handle-touch-end-input.js";
import { isOutOfBounds } from "./is-out-of-bounds.js";
import { launchRune } from "./launch-rune.js";
import { resetInput } from "./reset-input.js";
import { resetRune } from "./reset-rune.js";
import { runPreLaunchAnimation } from "./run-pre-launch-animation.js";
import { runeInput } from "./rune-input.js";

export const updateRune = ({
  rune,
  timestamp,
}: {
  rune: Rune;
  timestamp: number;
}) => {
  if (runeInput.touchEnd && rune.state !== "finishing") {
    handleTouchEndInput({ rune });

    resetInput({ runeInput });

    return;
  }

  if (
    runeInput.touchStart &&
    rune.state !== "outOfBounds" &&
    rune.state !== "finishing"
  ) {
    resetRune({ rune });

    rune.stylus.update(
      {
        x: runeInput.touchPosition.x - rune.dimensions.left,
        y: runeInput.touchPosition.y - rune.dimensions.top,
      },
      { both: true },
    );

    resetInput({ runeInput });

    return;
  }

  if (runeInput.touchMove && rune.state !== "finishing") {
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

      resetInput({ runeInput });

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
      resetInput({ runeInput });

      return;
    }

    const { x, y } = rune.stylus.getBrushCoordinates();

    rune.vertices.push({ x, y });

    rune.rendering.vertices.push({ x, y });

    resetInput({ runeInput });

    return;
  }

  if (rune.state === "outOfBounds" && rune.outOfBounds.outOfBoundsAt) {
    resetInput({ runeInput });

    const timeOutOfBounds = timestamp - rune.outOfBounds.outOfBoundsAt;

    if (timeOutOfBounds > rune.outOfBounds.maxTimeOutOfBounds) {
      rune.state = undefined;

      runeInput.touchEnd = true;
    }

    resetInput({ runeInput });

    return;
  }

  if (rune.state === "finishing") {
    resetInput({ runeInput });

    runPreLaunchAnimation({ rune, timestamp });

    if (rune.rendering.vertices.length <= 1) {
      rune.state = undefined;

      launchRune({
        rune,
      });
    }

    resetInput({ runeInput });

    return;
  }
};
