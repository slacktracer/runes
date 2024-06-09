import type { Rune } from "../../../types/Rune.js";
import { RUNE_MINIMAL_VIABLE_LENGTH } from "../../../values.js";
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
