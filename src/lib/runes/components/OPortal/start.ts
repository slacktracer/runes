import { get } from "svelte/store";

import { local } from "../../local.js";

export const start = (event: TouchEvent) => {
  const localStore = get(local);

  if (localStore.rune.rendering.isRendering) {
    return;
  }

  local.update((state) => {
    state.rune.vertices.length = 0;

    state.rune.rendering.vertices.length = 0;

    state.rune.rendering.isRendering;

    return state;
  });

  const {
    rune: { stylus },
  } = localStore;

  const [{ clientX: x, clientY: y }] = event.changedTouches;

  stylus.update({ x, y }, { both: true });
};
