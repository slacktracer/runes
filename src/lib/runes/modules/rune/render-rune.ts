import { getMidPoint } from "../../get-mid-point.js";
import type { Rune } from "../../types/Rune.js";

export const renderRune = ({
  renderingContext,
  rune,
}: {
  renderingContext: CanvasRenderingContext2D;
  rune: Rune;
}) => {
  renderingContext.lineCap = "round";

  renderingContext.lineWidth = rune.rendering.thickness;

  renderingContext.shadowBlur = rune.rendering.shadowBlur;

  renderingContext.shadowColor = rune.rendering.shadowColour.value;

  renderingContext.strokeStyle = rune.rendering.colour.value;

  let [pointA, pointB] = rune.rendering.vertices;

  renderingContext.beginPath();

  if (rune.state.getSnapshot().value === "launching") {
    if (!pointA) {
      return;
    }

    renderingContext.arc(
      pointA.x,
      pointA.y,
      rune.rendering.radius,
      0,
      2 * Math.PI,
    );

    renderingContext.fillStyle = rune.rendering.colour.value;

    renderingContext.fill();
  } else {
    if (!(pointA && pointB)) {
      return;
    }

    renderingContext.moveTo(pointA.x, pointA.y);

    for (let i = 1, len = rune.rendering.vertices.length; i < len; i++) {
      const midPoint = getMidPoint(pointA, pointB);

      renderingContext.quadraticCurveTo(
        pointA.x,
        pointA.y,
        midPoint.x,
        midPoint.y,
      );

      pointA = rune.rendering.vertices[i];

      pointB = rune.rendering.vertices[i + 1];
    }

    renderingContext.lineTo(pointA.x, pointA.y);

    renderingContext.strokeStyle = rune.rendering.colour.value;

    renderingContext.stroke();
  }
};
