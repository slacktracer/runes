import type { Rune } from "../../types/Rune.js";

export const runPreLaunchAnimation = ({ rune }: { rune: Rune }) => {
  const { promise, resolve } = Promise.withResolvers<void>();

  const intervalID = setInterval(() => {
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
        rune.rendering.radius = Math.max(rune.rendering.radius - 40, 0);
      }

      if (rune.rendering.radius < 1) {
        clearInterval(intervalID);

        resolve();
      }
    }

    if (length > 1) {
      rune.rendering.vertices = rune.rendering.vertices.slice(1, length);
    }
  }, 100);

  return promise;
};
