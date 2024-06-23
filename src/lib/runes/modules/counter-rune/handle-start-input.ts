import type { CounterRune } from "../../types/CounterRune";

export const handleStartInput = ({
  counterRune,
}: {
  counterRune: CounterRune;
}) => {
  counterRune.stylus.update(
    {
      x: counterRune.input.touchPosition.x - counterRune.dimensions.left,
      y: counterRune.input.touchPosition.y - counterRune.dimensions.top,
    },
    { both: true, friction: 0.01 },
  );
};
