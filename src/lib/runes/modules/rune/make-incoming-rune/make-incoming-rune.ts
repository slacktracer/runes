import type { IncomingRune } from "../../../types/IncomingRune";
import { makeAnimations } from "../make-rune/make-animations";
import { makeInput } from "../make-rune/make-input";
import { makeState } from "../make-rune/make-state.js";
import { makeRendering } from "./make-rendering";

export const makeIncomingRune = ({ vertices = [] } = {}): IncomingRune => ({
  animations: makeAnimations(),
  incoming: true,
  input: makeInput(),
  rendering: makeRendering({ vertices }),
  vertices,
  state: makeState().start(),
});
