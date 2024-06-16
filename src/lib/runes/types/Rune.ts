import type { Tween } from "@tweenjs/tween.js";
import type { StateValue, StateValueMap } from "xstate";

import type { HSLA } from "../HSLA.js";
import type { LazyBrush } from "./LazyBrush.js";
import type { Point } from "./Point.js";

export type Rune = {
  animations: {
    launching: {
      duration: number;
      from: { opacity: number; radius: number };
      to: { opacity: number; radius: ({ rune }: { rune: Rune }) => number };
      tween?: Tween<{ opacity: number; radius: number }>;
    };
    running: {
      accumulator: number;
      isRunning: false | number;
    };
    withering: {
      duration: number;
      from: { saturation: number; thickness: number };
      to: { saturation: number; thickness: number };
      tween?: Tween<{ saturation: number; thickness: number }>;
    };
  };
  dimensions: { left: number; height: number; top: number; width: number };
  input: {
    touchEnd: boolean;
    touchMove: boolean;
    touchPosition: { x: number; y: number };
    touchStart: boolean;
  };
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
