import type { Rune } from "../../../types/Rune.js";
import type { RuneInput } from "../../../types/RuneInput.js";
import { handleStartInput } from "./handle-start-input.js";

export const readyStateHandler = ({
  rune,
  runeInput,
}: {
  rune: Rune;
  runeInput: RuneInput;
}) => {
  if (runeInput.touchStart) {
    handleStartInput({ rune });

    rune.state.send({ type: "start" });
  }
};
