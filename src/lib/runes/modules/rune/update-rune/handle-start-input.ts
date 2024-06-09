import type { Rune } from "../../../types/Rune.js";

export const handleStartInput = ({ rune }: { rune: Rune }) => {
  rune.stylus.update(
    {
      x: rune.input.touchPosition.x - rune.dimensions.left,
      y: rune.input.touchPosition.y - rune.dimensions.top,
    },
    { both: true },
  );
};
