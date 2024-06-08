import type { Rune } from "../../../types/Rune";

export const makeAnimations = () => ({
  growing: {
    duration: 250,
    from: { opacity: 0.7, radius: 15 },
    to: {
      opacity: 0,
      radius: ({ rune }: { rune: Rune }) => rune.vertices.length * 3,
    },
    tween: false,
  },
  running: {
    accumulator: 0,
    isRunning: false,
  },
  withering: {
    duration: 250,
    from: { saturation: 100, thickness: 15 },
    to: { saturation: 0, thickness: 0 },
    tween: false,
  },
});
