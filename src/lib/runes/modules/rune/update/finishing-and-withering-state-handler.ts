import { Easing, Tween } from "@tweenjs/tween.js";

import type { Rune } from "../../../types/Rune";
import { resetRune } from "../reset-rune";

export const finishingAndWitheringStateHandler = ({ rune }: { rune: Rune }) => {
  if (rune.rendering.animations.withering.tween) {
    rune.rendering.animations.withering.tween.update();

    rune.rendering.colour.saturation =
      rune.rendering.animations.withering.from.saturation;
    rune.rendering.thickness =
      rune.rendering.animations.withering.from.thickness;

    return;
  }

  rune.rendering.animations.withering.tween = new Tween(
    rune.rendering.animations.withering.from,
  )
    .easing(Easing.Quadratic.Out)
    .to(
      rune.rendering.animations.withering.to,
      rune.rendering.animations.withering.duration,
    )
    .onComplete(() => {
      rune.state.send({ type: "end" });

      resetRune({ rune });
    })
    .start();
};
