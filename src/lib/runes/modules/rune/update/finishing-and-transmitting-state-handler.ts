import { Easing, Tween } from "@tweenjs/tween.js";

import type { Rune } from "../../../types/Rune";
import { resetRune } from "../reset-rune";

export const finishingAndTransmittingStateHandler = ({
  rune,
}: {
  rune: Rune;
}) => {
  if (rune.rendering.animations.transmitting.tween) {
    rune.rendering.animations.transmitting.tween.update();

    rune.rendering.colour.alpha =
      rune.rendering.animations.transmitting.from.opacity;
    rune.rendering.radius = rune.rendering.animations.transmitting.from.radius;

    return;
  }

  rune.rendering.animations.transmitting.tween = new Tween(
    rune.rendering.animations.transmitting.from,
  )
    .easing(Easing.Quadratic.Out)
    .to(
      rune.rendering.animations.transmitting.to,
      rune.rendering.animations.transmitting.duration,
    )
    .onComplete(() => {
      rune.state.send({ type: "end" });

      resetRune({ rune });
    })
    .start();
};
