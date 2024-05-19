import { get } from "svelte/store";

import { local } from "../../local.js";
import { launch } from "./launch.js";

export const stop = () => {
  console.log("stop");
  const localStore = get(local);

  const { rune } = localStore;

  launch({ rune });

  local.update((state) => {
    state.rune = [];

    return state;
  });

  const { stylus } = localStore;

  const { x, y } = stylus.getBrushCoordinates();

  stylus.update({ x, y }, { both: true });
};
