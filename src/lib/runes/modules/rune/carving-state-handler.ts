import { RUNE_MINIMAL_VIABLE_LENGTH } from "../../config/values.js";
import type { Rune } from "../../types/Rune.js";
import { normaliseRune } from "../normalise-rune";
import { handleMoveInput } from "./handle-move-input.js";

export const carvingStateHandler = ({
  rune,
  timestamp,
}: {
  rune: Rune;
  timestamp: number;
}) => {
  if (rune.input.touchEnd) {
    if (rune.vertices.length < RUNE_MINIMAL_VIABLE_LENGTH) {
      rune.state.send({ type: "wasNotViable" });

      return;
    }

    normaliseRune({ rune });

    rune.state.send({ type: "end" });

    return;
  }

  if (rune.input.touchMove) {
    const withinBounds = handleMoveInput({ rune, timestamp });

    if (withinBounds === false) {
      rune.state.send({ type: "wentOutOfBounds" });
    }
  }
};
