import type { Rune } from "../../../types/Rune.js";
import type { RuneInput } from "../../../types/RuneInput";

export const handleStartInput = ({
  rune,
  runeInput,
}: {
  rune: Rune;
  runeInput: RuneInput;
}) => {
  rune.stylus.update(
    {
      x: runeInput.touchPosition.x - rune.dimensions.left,
      y: runeInput.touchPosition.y - rune.dimensions.top,
    },
    { both: true },
  );
};
