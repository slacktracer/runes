import type { IncomingRune } from "../../types/IncomingRune";
import { makeAnimations } from "./make-animations";
import { makeRendering } from "./make-rendering";
import { makeState } from "./make-state.js";

export const makeIncomingRune = ({ vertices = [] } = {}): IncomingRune => {
  const lastVertex = vertices.at(-1);

  return {
    animations: makeAnimations(),
    done: 0,
    rendering: lastVertex
      ? makeRendering({ vertices: [structuredClone(lastVertex)] })
      : makeRendering(),
    vertices,
    state: makeState().start(),
  };
};
