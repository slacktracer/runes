import { Easing, Tween } from "@tweenjs/tween.js";

import type { Rune } from "../../types/Rune";
import { resetRune } from "./reset-rune";

export const launchingStateHandler = ({ rune }: { rune: Rune }) => {
  if (rune.animations.growing.tween) {
    rune.animations.growing.tween.update();

    rune.rendering.colour.alpha = rune.animations.growing.from.opacity;
    rune.rendering.radius = rune.animations.growing.from.radius;

    return;
  }

  // TODO better naming the tweens (say, growingTween) and then reuse the tweens
  rune.animations.growing.tween = new Tween(rune.animations.growing.from)
    .easing(Easing.Quadratic.Out)
    .to(
      {
        opacity: rune.animations.growing.to.opacity,
        radius: rune.animations.growing.to.radius({ rune }),
      },
      rune.animations.growing.duration,
    )
    .onComplete(() => {
      rune.state.send({ type: "end" });

      resetRune({ rune });
    })
    .start();
};
