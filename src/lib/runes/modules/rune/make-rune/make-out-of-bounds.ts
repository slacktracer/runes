import { RUNE_MAX_TIME_OUT_OF_BOUNDS } from "../../../values";

export const makeOutOfBounds = () => ({
  isOutOfBounds: false,
  maxTimeOutOfBounds: RUNE_MAX_TIME_OUT_OF_BOUNDS,
  outOfBoundsAt: undefined,
});
