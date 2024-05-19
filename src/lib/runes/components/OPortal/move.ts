import { get } from "svelte/store";

import { local } from "../../local.js";

export const move = (event: TouchEvent) => {
  const { isBeingCarved, stylus } = get(local);

  if (isBeingCarved && event.target instanceof HTMLCanvasElement) {
    const rect = event.target.getBoundingClientRect();

    const [{ clientX: x, clientY: y }] = event.changedTouches;

    stylus.update({ x: x - rect.left, y: y - rect.top }, { friction: 0.1 });

    const hasMoved = stylus.brushHasMoved();

    if (!hasMoved) {
      return;
    }

    const { x: stylusX, y: stylusY } = stylus.getBrushCoordinates();

    local.update((state) => {
      let updatedEnergy =
        state.carvingEnergy - (Date.now() - state.carvingStarted);

      state.carvingStarted = Date.now();

      if (updatedEnergy < 0) {
        updatedEnergy = 0;
      }

      state.carvingEnergy = updatedEnergy;

      if (state.carvingEnergy === 0) {
        state.isBeingCarved = false;

        state.carvingCoolDown = 2000;

        return state;
      }

      state.rune.push({ x: stylusX, y: stylusY });

      return state;
    });
  }
};
