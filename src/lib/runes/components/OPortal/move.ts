import { get } from "svelte/store";

import { local } from "../../local.js";

export const move = (event: TouchEvent) => {
  const { stylus } = get(local);

  if (event.target instanceof HTMLCanvasElement) {
    const rect = event.target.getBoundingClientRect();

    const [{ clientX: x, clientY: y }] = event.changedTouches;

    stylus.update({ x: x - rect.left, y: y - rect.top }, { friction: 0.1 });

    const hasMoved = stylus.brushHasMoved();

    if (!hasMoved) {
      return;
    }

    const { x: stylusX, y: stylusY } = stylus.getBrushCoordinates();

    local.update((state) => {
      state.rune.push({ x: stylusX, y: stylusY });

      return state;
    });
  }
};
