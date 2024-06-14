import {
  INCOMING_RUNE_ANIMATIONS_LANDING_DURATION,
  INCOMING_RUNE_ANIMATIONS_LANDING_FROM_OPACITY,
  INCOMING_RUNE_ANIMATIONS_LANDING_RADIUS,
  INCOMING_RUNE_ANIMATIONS_LANDING_TO_OPACITY,
  INCOMING_RUNE_ANIMATIONS_LANDING_TO_RADIUS_MULTIPLIER,
} from "../../../config/values.js";
import type { IncomingRune } from "../../../types/IncomingRune";

export const makeAnimations = () =>
  ({
    landing: {
      duration: INCOMING_RUNE_ANIMATIONS_LANDING_DURATION,
      from: {
        opacity: INCOMING_RUNE_ANIMATIONS_LANDING_FROM_OPACITY,
        radius: ({ incomingRune }: { incomingRune: IncomingRune }) =>
          incomingRune.vertices.length *
          INCOMING_RUNE_ANIMATIONS_LANDING_TO_RADIUS_MULTIPLIER,
      },
      to: {
        opacity: INCOMING_RUNE_ANIMATIONS_LANDING_TO_OPACITY,
        radius: INCOMING_RUNE_ANIMATIONS_LANDING_RADIUS,
      },
      tween: false,
    },
    running: {
      accumulator: 0,
      isRunning: false,
    },
  }) as const;
