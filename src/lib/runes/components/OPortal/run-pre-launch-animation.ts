import { getRandomInteger } from "../../get-random-integer.js";
import { local } from "../../local.js";

export const runPreLaunchAnimation = () => {
  const { promise, resolve } = Promise.withResolvers<void>();

  const intervalID = setInterval(() => {
    local.update((state) => {
      const length = state.rune.vertices.length;

      if (length < 3) {
        const [first, last] = state.rune.vertices;

        const legA = first.x - last.x;
        const legB = first.y - last.y;
        const distance = Math.sqrt(legA ** 2 + legB ** 2);

        if (distance === 0) {
          state.rune.state = "last";

          clearInterval(intervalID);

          resolve();

          return state;
        }

        const angle = Math.atan2(last.y - first.y, last.x - first.x);
        const velocity = Math.min(distance, 10);
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

      const pointToRemove = getRandomInteger({ max: length - 2, min: 1 });

      state.rune.vertices.splice(pointToRemove, 1);

      return state;
    });
  }, 1000 / 30);

  return promise;
};
