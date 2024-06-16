import { Easing, Tween } from "@tweenjs/tween.js";

import type { Rune } from "../../types/Rune";
import { resetRune } from "./reset-rune";

export const launchingStateHandler = ({ rune }: { rune: Rune }) => {
  if (rune.animations.launching.tween) {
    rune.animations.launching.tween.update();

    rune.rendering.colour.alpha = rune.animations.launching.from.opacity;
    rune.rendering.radius = rune.animations.launching.from.radius;

    return;
  }

  rune.animations.launching.tween = new Tween(rune.animations.launching.from)
    .easing(Easing.Quadratic.Out)
    .to(
      {
        opacity: rune.animations.launching.to.opacity,
        radius: rune.animations.launching.to.radius({ rune }),
      },
      rune.animations.launching.duration,
    )
    .onComplete(() => {
      rune.state.send({ type: "end" });

      resetRune({ rune });
    })
    .start();
};
