import {
  RUNE_ANIMATIONS_GROWING_DURATION,
  RUNE_ANIMATIONS_GROWING_FROM_OPACITY,
  RUNE_ANIMATIONS_GROWING_RADIUS,
  RUNE_ANIMATIONS_GROWING_TO_OPACITY,
  RUNE_ANIMATIONS_GROWING_TO_RADIUS_MULTIPLIER,
  RUNE_ANIMATIONS_WITHERING_DURATION,
  RUNE_ANIMATIONS_WITHERING_FROM_SATURATION,
  RUNE_ANIMATIONS_WITHERING_FROM_THICKNESS,
  RUNE_ANIMATIONS_WITHERING_TO_SATURATION,
  RUNE_ANIMATIONS_WITHERING_TO_THICKNESS,
} from "../../../config/values.js";
import type { Rune } from "../../../types/Rune";

export const makeAnimations = () =>
  ({
    growing: {
      duration: RUNE_ANIMATIONS_GROWING_DURATION,
      from: {
        opacity: RUNE_ANIMATIONS_GROWING_FROM_OPACITY,
        radius: RUNE_ANIMATIONS_GROWING_RADIUS,
      },
      to: {
        opacity: RUNE_ANIMATIONS_GROWING_TO_OPACITY,
        radius: ({ rune }: { rune: Rune }) =>
          rune.vertices.length * RUNE_ANIMATIONS_GROWING_TO_RADIUS_MULTIPLIER,
      },
      tween: false,
    },
    running: {
      accumulator: 0,
      isRunning: false,
    },
    withering: {
      duration: RUNE_ANIMATIONS_WITHERING_DURATION,
      from: {
        saturation: RUNE_ANIMATIONS_WITHERING_FROM_SATURATION,
        thickness: RUNE_ANIMATIONS_WITHERING_FROM_THICKNESS,
      },
      to: {
        saturation: RUNE_ANIMATIONS_WITHERING_TO_SATURATION,
        thickness: RUNE_ANIMATIONS_WITHERING_TO_THICKNESS,
      },
      tween: false,
    },
  }) as const;
