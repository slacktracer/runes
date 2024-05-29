export const isOutOfBounds = ({
  height,
  margin,
  width,
  x,
  y,
}: {
  height: number;
  margin: number;
  width: number;
  x: number;
  y: number;
}) => {
  const distanceToBottom = height - y;
  const distanceToLeft = x;
  const distanceToRight = width - x;
  const distanceToTop = y;

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
