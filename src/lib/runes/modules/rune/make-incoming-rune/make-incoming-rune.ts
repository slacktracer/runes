import type { IncomingRune } from "../../../types/IncomingRune";
import { makeRendering } from "./make-rendering";
import { makeState } from "./make-state.js";

export const makeIncomingRune = ({ vertices = [] } = {}): IncomingRune => ({
  rendering: makeRendering({ vertices }),
  vertices,
  state: makeState().start(),
});
