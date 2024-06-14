import { getMidPoint } from "../../get-mid-point.js";
import type { IncomingRune } from "../../types/IncomingRune";

export const renderIncomingRune = ({
  incomingRune,
  renderingContext,
}: {
  incomingRune: IncomingRune;
  renderingContext: CanvasRenderingContext2D;
}) => {
  const incomingRuneState = incomingRune.state.getSnapshot().value;

  if (incomingRuneState === "ready") {
    return;
  }

  renderingContext.lineCap = "round";

  renderingContext.lineWidth = incomingRune.rendering.thickness;

  renderingContext.shadowBlur = incomingRune.rendering.shadowBlur;

  renderingContext.shadowColor = incomingRune.rendering.shadowColour.value;

  renderingContext.strokeStyle = incomingRune.rendering.colour.value;

  renderingContext.beginPath();

  if (incomingRuneState === "landing") {
    const pointZ = incomingRune.rendering.vertices.at(-1);

    if (!pointZ) {
      return;
    }

    renderingContext.arc(
      pointZ.x,
      pointZ.y,
      incomingRune.rendering.radius,
      0,
      2 * Math.PI,
    );

    renderingContext.fillStyle = incomingRune.rendering.colour.value;

    renderingContext.fill();
  } else {
    let [pointA, pointB] = incomingRune.rendering.vertices;

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
