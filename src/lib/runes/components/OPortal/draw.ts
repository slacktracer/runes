import { getMidPoint } from "../../get-mid-point.js";
import type { Point } from "../../types/Point.js";

export const draw = ({
  context,
  rune,
  runeColour,
}: {
  context: CanvasRenderingContext2D;
  rune: Point[];
  runeColour: string;
}) => {
  if (rune.length < 2) {
    return;
  }

  context.strokeStyle = runeColour;

  context.lineWidth = 25;

  context.lineCap = "round";

  let [pointA, pointB] = rune;

  context.moveTo(pointB.x, pointB.y);

  context.beginPath();

  for (let i = 1, len = rune.length; i < len; i++) {
    const midPoint = getMidPoint(pointA, pointB);

    context.quadraticCurveTo(pointA.x, pointA.y, midPoint.x, midPoint.y);

    pointA = rune[i];

    pointB = rune[i + 1];
  }

  context.lineTo(pointA.x, pointA.y);

  context.stroke();
};
