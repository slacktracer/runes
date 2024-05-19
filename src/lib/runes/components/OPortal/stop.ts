import simplify from "simplify-js";
import { get } from "svelte/store";

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

  const localStore = get(local);

  const { rune } = localStore;

  launch({
    rune,
  });
};
