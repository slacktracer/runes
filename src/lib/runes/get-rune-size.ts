import type { Rune } from "./types/Rune";

export const getRuneMagnitude = ({ rune }: { rune: Rune }) =>
  rune.vertices.reduce((magnitude, pointB, currentIndex, vertices) => {
    const c = vertices[currentIndex + 1];

    if (c) {
      return Math.hypot(pointB.x - c.x, pointB.y - c.y) + magnitude;
    }

    return magnitude;
  }, 0);
