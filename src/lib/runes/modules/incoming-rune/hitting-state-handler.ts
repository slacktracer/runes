import { Easing, Tween } from "@tweenjs/tween.js";

import { oscillate } from "../../oscillate";
import type { IncomingRune } from "../../types/IncomingRune";

export const hittingStateHandler = ({
  incomingRune,
}: {
  incomingRune: IncomingRune;
}) => {
  if (incomingRune.vertices.length === 0) {
    incomingRune.state.send({ type: "defeated" });
  }

  if (incomingRune.animations.hitting.tween) {
    incomingRune.animations.hitting.tween.update();

    incomingRune.rendering.vertices.forEach((vertex, index) => {
      const v = incomingRune.vertices.at(-index - 1);

      incomingRune.animations.hitting.tick += 1;

      if (v) {
        vertex.x = oscillate(
          incomingRune.animations.hitting.tick,
          v.x - incomingRune.animations.hitting.proxy.oscillation,
          v.x + incomingRune.animations.hitting.proxy.oscillation,
        );

        vertex.y = oscillate(
          incomingRune.animations.hitting.tick,
          v.y - incomingRune.animations.hitting.proxy.oscillation,
          v.y + incomingRune.animations.hitting.proxy.oscillation,
        );
      }
    });

    return;
  }

  incomingRune.animations.hitting.tween = new Tween(
    incomingRune.animations.hitting.proxy,
  )
    .easing(Easing.Exponential.In)
    .to(
      incomingRune.animations.hitting.to,
      incomingRune.animations.hitting.duration({ incomingRune }),
    )
    .onComplete(() => {
      incomingRune.state.send({ type: "done" });
    })
    .start();
};
