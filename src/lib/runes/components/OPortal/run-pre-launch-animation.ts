import { local } from "../../local.js";

export const runPreLaunchAnimation = () => {
  const { promise, resolve } = Promise.withResolvers<void>();

  const intervalID = setInterval(() => {
    local.update((state) => {
      const { rune } = state;

      const length = rune.rendering.vertices.length;

      if (length === 1) {
        if (rune.rendering.state === "") {
          rune.rendering.state = "grow";
        }

        if (rune.rendering.radius > 200) {
          rune.rendering.state = "shrink";
        }

        if (rune.rendering.state === "grow") {
          rune.rendering.radius += 40;
        }

        if (rune.rendering.state === "shrink") {
          rune.rendering.radius -= 40;
        }

        if (rune.rendering.radius < 1) {
          clearInterval(intervalID);

          resolve();
        }

        return state;
      }

      if (length > 1) {
        rune.rendering.vertices = rune.rendering.vertices.slice(1, length);
      }

      return state;
    });
  }, 1000 / 60);

  return promise;
};
