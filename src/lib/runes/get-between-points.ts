import type { Point } from "./types/Point";

export const getBetweenPoints = ({
  pointA,
  pointB,
  betweenPointCount,
}: {
  pointA: Point;
  pointB: Point;
  betweenPointCount: number;
}) => {
  const between = [];

  for (let i = 1; i < betweenPointCount; i += 1) {
    const x = {
      x: pointA.x + (pointB.x - pointA.x) * (i / betweenPointCount),
      y: pointA.y + (pointB.y - pointA.y) * (i / betweenPointCount),
    };
    between.push(x);
  }

  return between;
};
