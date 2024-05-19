import { get } from "svelte/store";

import { local } from "../../local.js";

export const start = (event: TouchEvent) => {
  const localStore = get(local);

  const { runeFinished } = localStore;

  if (runeFinished) {
    return;
  }

  local.update((state) => {
    state.isBeingCarved = true;

    state.carvingStarted = Date.now();

    state.rune.length = 0;

    return state;
  });

  const { stylus } = localStore;

  const [{ clientX: x, clientY: y }] = event.changedTouches;

  stylus.update({ x, y }, { both: true });
};
