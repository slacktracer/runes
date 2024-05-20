import simplify from "simplify-js";
import { get } from "svelte/store";

import { local } from "../../local.js";
import { launch } from "./launch.js";
import { runPreLaunchAnimation } from "./run-pre-launch-animation.js";

export const stop = async () => {
  const localStore = get(local);

  if (!localStore.rune.rendering.didMove) {
    return;
  }

  local.update((state) => {
    const vertices = simplify(state.rune.vertices);

    state.rune.vertices = vertices;

    state.rune.rendering.vertices = vertices;

    localStore.rune.rendering.didMove = false;

    return state;
  });

  await runPreLaunchAnimation();

  local.update((state) => {
    state.rune.rendering.isRendering = false;

    return state;
  });

  const { rune } = localStore;

  launch({
    rune,
  });
};
