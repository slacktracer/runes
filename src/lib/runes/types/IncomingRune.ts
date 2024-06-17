import type { Group, Tween } from "@tweenjs/tween.js";
import type { StateValue, StateValueMap } from "xstate";

import type { HSLA } from "../HSLA.js";
import type { Point } from "./Point.js";

export type IncomingRune = {
  animations: {
    landing: {
      duration: number;
      from: {
        opacity: number;
        radius: ({ incomingRune }: { incomingRune: IncomingRune }) => number;
      };
      proxy: {
        opacity: number;
        radius: number;
      };
      to: {
        opacity: number;
        radius: number;
      };
      tween: Tween<{ opacity: number; radius: number }>;
    };
    running: {
      accumulator: number;
      isRunning: false | number;
    };
    hitting: {
      duration: ({ incomingRune }: { incomingRune: IncomingRune }) => number;
      from: { oscillation: number };
      proxy: { oscillation: number };
      tick: number;
      to: { oscillation: number };
      tween: Tween<{ oscillation: number }>;
    };
    burning: {
      step1: {
        duration: number;
        from: { thickness: number };
        to: { thickness: number };
        tween: Tween<{ thickness: number }>;
      };
      step2: {
        duration: number;
        from: { alpha: number; saturation: number; thickness: number };
        to: { alpha: number; saturation: number; thickness: number };
        tween: Tween<{ alpha: number; saturation: number; thickness: number }>;
      };
      tweenGroup: Group;
    };
  };
  done: number;
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
};
