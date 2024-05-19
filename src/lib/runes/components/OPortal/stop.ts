import { get } from "svelte/store";

import { local } from "../../local.js";
import { launch } from "./launch.js";

export const stop = () => {
  const localStore = get(local);

  const { rune } = localStore;

  const originalRune = structuredClone(rune);

  const intervalID = setInterval(() => {
    local.update((state) => {
      state.rune.forEach((point) => {
        point.x += 5;
        point.y += 5;
      });

      if (state.rune[0].x > 300) {
        clearInterval(intervalID);

        launch({ rune: originalRune });

        state.rune = [];
      }

      return state;
    });
  }, 1000 / 30);
};
