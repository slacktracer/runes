import { getRandomInteger } from "../../get-random-integer.js";
import { local } from "../../local.js";
import { makeStylus } from "../../make-stylus.js";

export const runPreLaunchAnimation = () => {
  const { promise, resolve } = Promise.withResolvers<void>();

  const intervalID = setInterval(() => {
    local.update((state) => {
      const length = state.rune.rendering.vertices.length;

      if (length < 3) {
        const [first, last] = state.rune.rendering.vertices;

        const legA = first.x - last.x;
        const legB = first.y - last.y;
        const distance = Math.sqrt(legA ** 2 + legB ** 2);

        if (distance === 0) {
          if (state.rune.rendering.state === "") {
            state.rune.rendering.state = "grow";
          }

          if (state.rune.rendering.radius > 200) {
            state.rune.rendering.state = "shrink";
          }

          if (state.rune.rendering.state === "grow") {
            state.rune.rendering.radius += 40;
          }

          if (state.rune.rendering.state === "shrink") {
            state.rune.rendering.radius -= 40;
          }

          if (state.rune.rendering.radius < 1) {
            clearInterval(intervalID);

            resolve();

            state.rune = {
              rendering: {
                colour: "hsla(46, 100%, 50%, 0.75)",
                radius: 100,
                vertices: [],
                state: "",
              },
              vertices: [],
              stylus: makeStylus({ initialPoint: { x: 0, y: 0 } }),
            };

            return state;
          }

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

        return state;
      }

      const pointToRemove = getRandomInteger({ max: length - 2, min: 1 });

      state.rune.rendering.vertices.splice(pointToRemove, 1);

      return state;
    });
  }, 1000 / 60);

  return promise;
};
