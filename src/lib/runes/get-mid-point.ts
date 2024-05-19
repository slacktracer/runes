import type { Point } from "./types/Point.js";

export const getMidPoint = (pointA: Point, pointB: Point) => ({
  x: pointA.x + (pointB.x - pointA.x) / 2,
  y: pointA.y + (pointB.y - pointA.y) / 2,
});
