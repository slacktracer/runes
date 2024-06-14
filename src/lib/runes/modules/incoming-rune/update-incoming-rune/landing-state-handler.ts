import { Easing, Tween } from "@tweenjs/tween.js";

import type { IncomingRune } from "../../../types/IncomingRune";

let proxy = { opacity: 0, radius: 0 };

export const landingStateHandler = ({
  incomingRune,
}: {
  incomingRune: IncomingRune;
}) => {
  if (incomingRune.animations.landing.tween) {
    incomingRune.animations.landing.tween.update();

    incomingRune.rendering.colour.alpha = proxy.opacity;
    incomingRune.rendering.radius = proxy.radius;

    return;
  }

  proxy = {
    opacity: incomingRune.animations.landing.from.opacity,
    radius: incomingRune.animations.landing.from.radius({ incomingRune }),
  };

  incomingRune.animations.landing.tween = new Tween(proxy)
    .easing(Easing.Quadratic.Out)
    .to(
      incomingRune.animations.landing.to,
      incomingRune.animations.landing.duration,
    )
    .onComplete(() => {
      incomingRune.state.send({ type: "done" });
    })
    .start();
};
