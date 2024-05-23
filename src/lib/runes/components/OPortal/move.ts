import { get } from "svelte/store";

import { local } from "../../local.js";

export const move = (event: TouchEvent) => {
  const {
    rune: {
      rendering: { width },
      stylus,
    },
  } = get(local);

  if (event.target instanceof HTMLCanvasElement) {
    const rect = event.target.getBoundingClientRect();

    const [{ clientX: x, clientY: y }] = event.changedTouches;

    stylus.update({ x: x - rect.left, y: y - rect.top }, { friction: 0.1 });

    const hasMoved = stylus.brushHasMoved();

    if (!hasMoved) {
      return;
    }

    const { x: stylusX, y: stylusY } = stylus.getBrushCoordinates();

    const distanceToBottom = event.target.clientHeight - stylusY;
    const distanceToLeft = stylusX;
    const distanceToRight = event.target.clientWidth - stylusX;
    const distanceToTop = stylusY;

    let outOfBounds = false;

    if (
      distanceToBottom < width ||
      distanceToLeft < width ||
      distanceToRight < width ||
      distanceToTop < width
    ) {
      outOfBounds = true;
    }

    if (outOfBounds) {
      return;
    }

    local.update((state) => {
      state.rune.vertices.push({ x: stylusX, y: stylusY });

      state.rune.rendering.vertices.push({ x: stylusX, y: stylusY });

      state.rune.rendering.didMove = true;

      return state;
    });
  }
};
