import type { StateValue, StateValueMap } from "xstate";

import type { HSLA } from "../HSLA.js";
import type { LazyBrush } from "./LazyBrush.js";
import type { Point } from "./Point.js";

export type Rune = {
  animations: {
    growing: {
      duration: number;
      from: { opacity: number; radius: number };
      to: { opacity: number; radius: ({ rune }: { rune: Rune }) => number };
      tween:
        | false
        | {
            update: () => void;
          };
    };
    running: {
      accumulator: number;
      isRunning: false | number;
    };
    withering: {
      duration: number;
      from: { saturation: number; thickness: number };
      to: { saturation: number; thickness: number };
      tween:
        | false
        | {
            update: () => void;
          };
    };
  };
  dimensions: { left: number; height: number; top: number; width: number };
  outOfBounds: {
    isOutOfBounds: boolean;
    maxTimeOutOfBounds: number;
    outOfBoundsAt: undefined | number;
  };
  rendering: {
    colour: HSLA;
    radius: number;
    shadowBlur: number;
    shadowColour: HSLA;
    thickness: number;
    vertices: Point[];
  };
  vertices: Point[];
  state: {
    getSnapshot: () => { value: StateValue | StateValueMap };
    send: (parameters: { type: string }) => void;
  };
  stylus: LazyBrush;
};
