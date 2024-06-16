import type { Rune } from "../../types/Rune.js";

export const handleStartInput = ({ rune }: { rune: Rune }) => {
  // todo
  // this may be unnecessary/makes no difference
  // remove a handler/step would make things simpler overall
  rune.stylus.update(
    {
      x: rune.input.touchPosition.x - rune.dimensions.left,
      y: rune.input.touchPosition.y - rune.dimensions.top,
    },
    { both: true, friction: 0.01 },
  );
};
