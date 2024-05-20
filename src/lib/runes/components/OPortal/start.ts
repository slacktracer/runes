import { get } from "svelte/store";

import { getInitialRuneState } from "../../get-initial-rune-state.js";
import { local } from "../../local.js";

export const start = (event: TouchEvent) => {
  const localStore = get(local);

  if (localStore.rune.rendering.isRendering) {
    return;
  }

  local.update((state) => {
    state.rune = getInitialRuneState();

    state.rune.rendering.isRendering = true;

    return state;
  });

  const {
    rune: { stylus },
  } = localStore;

  const [{ clientX: x, clientY: y }] = event.changedTouches;

  if (event.target instanceof HTMLCanvasElement) {
    const rect = event.target.getBoundingClientRect();

    stylus.update({ x: x - rect.left, y: y - rect.top }, { both: true });
  }
};
