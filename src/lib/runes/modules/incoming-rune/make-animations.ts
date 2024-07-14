import {
  INCOMING_RUNE_ANIMATIONS_HITTING_DELAY,
  INCOMING_RUNE_ANIMATIONS_HITTING_DURATION_MULTIPLIER,
  INCOMING_RUNE_ANIMATIONS_LANDING_DURATION,
  INCOMING_RUNE_ANIMATIONS_LANDING_FROM_OPACITY,
  INCOMING_RUNE_ANIMATIONS_LANDING_RADIUS,
  INCOMING_RUNE_ANIMATIONS_LANDING_TO_OPACITY,
  INCOMING_RUNE_ANIMATIONS_LANDING_TO_RADIUS_MULTIPLIER,
} from "../../config/values.js";
import type { IncomingRune } from "../../types/IncomingRune";

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
      proxy: { opacity: 0, radius: 0 },
      to: {
        opacity: INCOMING_RUNE_ANIMATIONS_LANDING_TO_OPACITY,
        radius: INCOMING_RUNE_ANIMATIONS_LANDING_RADIUS,
      },
      tween: undefined,
    },
    running: {
      accumulator: 0,
      isRunning: false,
    },
    hitting: {
      duration: ({ incomingRune }: { incomingRune: IncomingRune }) =>
        incomingRune.vertices.length *
          INCOMING_RUNE_ANIMATIONS_HITTING_DURATION_MULTIPLIER +
        INCOMING_RUNE_ANIMATIONS_HITTING_DELAY,
      from: { oscillation: 0 },
      proxy: { oscillation: 0 },
      tick: -1,
      to: { oscillation: 10 },
      tween: undefined,
    },
    burning: {
      step1: {
        duration: 150,
        from: { thickness: 15 },
        to: { thickness: 40 },
        tween: undefined,
      },
      step2: {
        duration: 150,
        from: { alpha: 0.7, saturation: 100, thickness: 40 },
        to: { alpha: 0.1, saturation: 0, thickness: 3 },
        tween: undefined,
      },
      tweenGroup: undefined,
    },
  }) as const;
