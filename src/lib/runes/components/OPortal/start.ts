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

  stylus.update({ x, y }, { both: true });
};
