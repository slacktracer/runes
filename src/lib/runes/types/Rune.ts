import type { StateValue, StateValueMap } from "xstate";

import type { HSLA } from "../HSLA.js";
import type { LazyBrush } from "./LazyBrush.js";
import type { Point } from "./Point.js";

export type Rune = {
  dimensions: { left: number; height: number; top: number; width: number };
  outOfBounds: {
    isOutOfBounds: boolean;
    maxTimeOutOfBounds: number;
    outOfBoundsAt: undefined | number;
  };
  rendering: {
    animations: {
      transmitting: {
        duration: number;
        from: { opacity: number; radius: number };
        to: { opacity: number; radius: number };
        tween:
          | false
          | {
              update: () => void;
            };
      };
    };
    colour: HSLA;
    radius: number;
    runningPreLaunchAnimation: false | number;
    runningPreLaunchAnimationAccumulator: number;
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
