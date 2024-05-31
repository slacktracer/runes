export const isOutOfBounds = ({
  height,
  thickness,
  width,
  x,
  y,
}: {
  height: number;
  thickness: number;
  width: number;
  x: number;
  y: number;
}) => {
  const distanceToBottom = height - y;
  const distanceToLeft = x;
  const distanceToRight = width - x;
  const distanceToTop = y;

  const margin = Math.ceil(thickness * (2 / 3));

  let outOfBounds = false;

  if (
    distanceToBottom < margin ||
    distanceToLeft < margin ||
    distanceToRight < margin ||
    distanceToTop < margin
  ) {
    outOfBounds = true;
  }

  return outOfBounds;
};
