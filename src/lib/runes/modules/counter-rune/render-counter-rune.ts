import { getMidPoint } from "../../get-mid-point.js";
import type { CounterRune } from "../../types/CounterRune";

export const renderCounterRune = ({
  renderingContext,
  counterRune,
}: {
  renderingContext: CanvasRenderingContext2D;
  counterRune: CounterRune;
}) => {
  renderingContext.lineCap = "round";

  renderingContext.lineWidth = counterRune.rendering.thickness;

  renderingContext.shadowBlur = counterRune.rendering.shadowBlur;

  renderingContext.shadowColor = counterRune.rendering.shadowColour.value;

  renderingContext.strokeStyle = counterRune.rendering.colour.value;

  let [pointA, pointB] = counterRune.rendering.vertices;

  renderingContext.beginPath();

  if (counterRune.state.getSnapshot().value === "launching") {
    if (!pointA) {
      return;
    }

    renderingContext.arc(
      pointA.x,
      pointA.y,
      counterRune.rendering.radius,
      0,
      2 * Math.PI,
    );

    renderingContext.fillStyle = counterRune.rendering.colour.value;

    renderingContext.fill();
  } else {
    if (!(pointA && pointB)) {
      return;
    }

    renderingContext.moveTo(pointA.x, pointA.y);

    for (let i = 1, len = counterRune.rendering.vertices.length; i < len; i++) {
      const midPoint = getMidPoint(pointA, pointB);

      renderingContext.quadraticCurveTo(
        pointA.x,
        pointA.y,
        midPoint.x,
        midPoint.y,
      );

      pointA = counterRune.rendering.vertices[i];

      pointB = counterRune.rendering.vertices[i + 1];
    }

    renderingContext.lineTo(pointA.x, pointA.y);

    renderingContext.strokeStyle = counterRune.rendering.colour.value;

    renderingContext.stroke();
  }
};
