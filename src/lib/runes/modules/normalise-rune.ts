import { RUNE_DESIRED_SEGMENT_LENGTH } from "../config/values";
import { getBetweenPoints } from "../get-between-points";
import type { Point } from "../types/Point";

export const normaliseRune = ({
  rune,
}: {
  rune: {
    vertices: Point[];
    rendering: { vertices: Point[] };
  };
}) => {
  const { vertices } = rune;

  for (let i = 0; i < vertices.length; i += 1) {
    const pointA = vertices[i];

    const pointB = vertices[i + 1];

    if (pointB) {
      const h = Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y);

      if (h > RUNE_DESIRED_SEGMENT_LENGTH) {
        const betweenPointCount = Math.floor(h / RUNE_DESIRED_SEGMENT_LENGTH);

        const betweenPoints = getBetweenPoints({
          pointA,
          pointB,
          betweenPointCount,
        });

        vertices.splice(i + 1, 0, ...betweenPoints);
      }
    }
  }

  vertices.forEach((point) => {
    point.x = Math.round(point.x);
    point.y = Math.round(point.y);
  });

  rune.rendering.vertices = vertices;
};
