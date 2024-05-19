import { getMidPoint } from "../../get-mid-point.js";
import type { Rune } from "../../types/Rune.js";

export const draw = ({
  context,
  rune,
}: {
  context: CanvasRenderingContext2D;
  rune: Rune;
}) => {
  if (rune.vertices.length < 2) {
    return;
  }

  context.strokeStyle = rune.colour;

  context.lineWidth = rune.state === "last" ? 250 : 25;

  context.lineCap = "round";

  let [pointA, pointB] = rune.vertices;

  context.moveTo(pointB.x, pointB.y);

  context.beginPath();

  for (let i = 1, len = rune.vertices.length; i < len; i++) {
    const midPoint = getMidPoint(pointA, pointB);

    context.quadraticCurveTo(pointA.x, pointA.y, midPoint.x, midPoint.y);

    pointA = rune.vertices[i];

    pointB = rune.vertices[i + 1];
  }

  context.lineTo(pointA.x, pointA.y);

  context.stroke();
};
