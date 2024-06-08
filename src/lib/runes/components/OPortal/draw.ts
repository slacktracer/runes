import { getMidPoint } from "../../get-mid-point.js";
import type { Rune } from "../../types/Rune.js";

export const draw = ({
  context,
  rune,
}: {
  context: CanvasRenderingContext2D;
  rune: Rune;
}) => {
  context.lineWidth = rune.rendering.thickness;

  context.lineCap = "round";

  context.shadowBlur = rune.rendering.shadowBlur;

  context.shadowColor = rune.rendering.shadowColour.value;

  context.strokeStyle = rune.rendering.colour.value;

  let [pointA, pointB] = rune.rendering.vertices;

  context.beginPath();

  if (rune.state.getSnapshot().value === "finishingAndTransmitting") {
    if (!pointA) {
      return;
    }

    context.arc(pointA.x, pointA.y, rune.rendering.radius, 0, 2 * Math.PI);

    context.fillStyle = rune.rendering.colour.value;

    context.fill();
  } else {
    if (!(pointA && pointB)) {
      return;
    }

    context.moveTo(pointA.x, pointA.y);

    for (let i = 1, len = rune.rendering.vertices.length; i < len; i++) {
      const midPoint = getMidPoint(pointA, pointB);

      context.quadraticCurveTo(pointA.x, pointA.y, midPoint.x, midPoint.y);

      pointA = rune.rendering.vertices[i];

      pointB = rune.rendering.vertices[i + 1];
    }

    context.lineTo(pointA.x, pointA.y);

    context.strokeStyle = rune.rendering.colour.value;

    context.stroke();
  }
};
