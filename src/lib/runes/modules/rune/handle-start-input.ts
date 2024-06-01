import type { Rune } from "../../types/Rune.js";
import { runeInput } from "./rune-input.js";

export const handleStartInput = ({ rune }: { rune: Rune }) => {
  rune.stylus.update(
    {
      x: runeInput.touchPosition.x - rune.dimensions.left,
      y: runeInput.touchPosition.y - rune.dimensions.top,
    },
    { both: true },
  );
};
