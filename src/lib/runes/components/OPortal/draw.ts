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

  context.lineWidth = 25;

  context.lineCap = "round";

  let [pointA, pointB] = rune.vertices;

  context.beginPath();

  if (rune.rendering.state !== "") {
    context.arc(pointA.x, pointA.y, rune.rendering.radius, 0, 2 * Math.PI);

    context.fillStyle = rune.rendering.colour;

    context.fill();
  } else {
    context.moveTo(pointB.x, pointB.y);

    for (let i = 1, len = rune.vertices.length; i < len; i++) {
      const midPoint = getMidPoint(pointA, pointB);

      context.quadraticCurveTo(pointA.x, pointA.y, midPoint.x, midPoint.y);

      pointA = rune.vertices[i];

      pointB = rune.vertices[i + 1];
    }

    context.lineTo(pointA.x, pointA.y);

    context.strokeStyle = rune.rendering.colour;

    context.stroke();
  }
};
