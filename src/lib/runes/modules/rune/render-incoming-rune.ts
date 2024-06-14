import { getMidPoint } from "../../get-mid-point.js";
import type { IncomingRune } from "../../types/IncomingRune";

export const renderIncomingRune = ({
  incomingRune,
  renderingContext,
}: {
  incomingRune: IncomingRune;
  renderingContext: CanvasRenderingContext2D;
}) => {
  renderingContext.lineCap = "round";

  renderingContext.lineWidth = incomingRune.rendering.thickness;

  renderingContext.shadowBlur = incomingRune.rendering.shadowBlur;

  renderingContext.shadowColor = incomingRune.rendering.shadowColour.value;

  renderingContext.strokeStyle = incomingRune.rendering.colour.value;

  let [pointA, pointB] = incomingRune.rendering.vertices;

  renderingContext.beginPath();

  if (incomingRune.state.getSnapshot().value === "finishingAndGrowing") {
    if (!pointA) {
      return;
    }

    renderingContext.arc(
      pointA.x,
      pointA.y,
      incomingRune.rendering.radius,
      0,
      2 * Math.PI,
    );

    renderingContext.fillStyle = incomingRune.rendering.colour.value;

    renderingContext.fill();
  } else {
    if (!(pointA && pointB)) {
      return;
    }

    renderingContext.moveTo(pointA.x, pointA.y);

    for (
      let i = 1, len = incomingRune.rendering.vertices.length;
      i < len;
      i++
    ) {
      const midPoint = getMidPoint(pointA, pointB);

      renderingContext.quadraticCurveTo(
        pointA.x,
        pointA.y,
        midPoint.x,
        midPoint.y,
      );

      pointA = incomingRune.rendering.vertices[i];

      pointB = incomingRune.rendering.vertices[i + 1];
    }

    renderingContext.lineTo(pointA.x, pointA.y);

    renderingContext.strokeStyle = incomingRune.rendering.colour.value;

    renderingContext.stroke();
  }
};
