import type { StateValue, StateValueMap } from "xstate";

import type { HSLA } from "../HSLA";
import type { LazyBrush } from "./LazyBrush";
import type { Point } from "./Point";

export type CounterRune = {
  dimensions: { left: number; height: number; top: number; width: number };
  input: {
    touchEnd: boolean;
    touchMove: boolean;
    touchPosition: { x: number; y: number };
    touchStart: boolean;
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
