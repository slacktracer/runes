import simplify from "simplify-js";
import { get } from "svelte/store";

import { getInitialRuneState } from "../../get-initial-rune-state.js";
import { local } from "../../local.js";
import { launch } from "./launch.js";
import { runPreLaunchAnimation } from "./run-pre-launch-animation.js";

export const stop = async () => {
  local.update((state) => {
    const vertices = simplify(state.rune.vertices);

    state.rune.vertices = vertices;

    state.rune.rendering.vertices = vertices;

    return state;
  });

  await runPreLaunchAnimation();

  local.update((state) => {
    state.rune.rendering.isRendering = false;

    state.rune = getInitialRuneState();

    return state;
  });

  const localStore = get(local);

  const { rune } = localStore;

  launch({
    rune,
  });
};
