import simplify from "simplify-js";
import { get } from "svelte/store";

import { local } from "../../local.js";
import { launch } from "./launch.js";

const randomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const stop = () => {
  const localStore = get(local);

  const { rune } = localStore;

  const originalRune = structuredClone(simplify(rune));

  const intervalID = setInterval(() => {
    local.update((state) => {
      state.rune = simplify(state.rune);

      const length = state.rune.length;

      if (length < 3) {
        const [first, last] = state.rune;

        const legA = first.x - last.x;
        const legB = first.y - last.y;

        const distance = Math.sqrt(legA ** 2 + legB ** 2);

        if (distance === 0) {
          state.rune.state = "last";

          clearInterval(intervalID);

          launch({ rune: originalRune });

          return state;
        }

        const angle = Math.atan2(last.y - first.y, last.x - first.x);
        const velocity = Math.min(distance, 5);
        const sine = Math.sin(angle) * velocity;
        const cosine = Math.cos(angle) * velocity;

        first.y += sine;
        first.x += cosine;

        const updatedLegA = first.x - last.x;
        const updatedLegB = first.y - last.y;

        const updatedDistance = Math.sqrt(updatedLegA ** 2 + updatedLegB ** 2);

        if (updatedDistance > 0) {
          last.y -= sine;
          last.x -= cosine;
        }

        // state.rune = [];
        return state;
      }

      const pointToRemove = randomInt(1, length - 2);

      state.rune.splice(pointToRemove, 1);

      return state;
    });
  }, 1000 / 30);
};
