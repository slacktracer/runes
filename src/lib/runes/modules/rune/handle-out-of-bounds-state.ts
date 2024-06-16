import type { Rune } from "../../types/Rune.js";

export const handleOutOfBoundsState = ({
  rune,
  timestamp,
}: {
  rune: Rune;
  timestamp: number;
}) => {
  const timeOutOfBounds =
    rune.outOfBounds.outOfBoundsAt &&
    timestamp - rune.outOfBounds.outOfBoundsAt;

  if (
    timeOutOfBounds &&
    timeOutOfBounds > rune.outOfBounds.maxTimeOutOfBounds
  ) {
    return true;
  }

  return false;
};
