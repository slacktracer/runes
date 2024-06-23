import { Easing, Group, Tween } from "@tweenjs/tween.js";

import type { IncomingRune } from "../../types/IncomingRune";

export const burningStateHandler = ({
  incomingRune,
}: {
  incomingRune: IncomingRune;
}) => {
  if (incomingRune.vertices.length === 0) {
    incomingRune.state.send({ type: "defeated" });
  }

  if (incomingRune.animations.burning.tweenGroup) {
    incomingRune.animations.burning.tweenGroup.update();

    return;
  }

  incomingRune.animations.burning.tweenGroup = new Group();

  incomingRune.animations.burning.step1.tween = new Tween(
    incomingRune.animations.burning.step1.from,
    incomingRune.animations.burning.tweenGroup,
  )
    .easing(Easing.Exponential.In)
    .to(
      incomingRune.animations.burning.step1.to,
      incomingRune.animations.burning.step1.duration,
    )
    .onUpdate((x) => {
      incomingRune.rendering.thickness = x.thickness;
    });

  incomingRune.animations.burning.step2.tween = new Tween(
    {
      alpha: incomingRune.rendering.colour.alpha,
      saturation: incomingRune.rendering.colour.saturation,
      thickness: incomingRune.animations.burning.step1.from.thickness,
    },
    incomingRune.animations.burning.tweenGroup,
  )
    .to(
      { alpha: 0.1, thickness: 2, saturation: 0 },
      incomingRune.animations.burning.step2.duration,
    )
    .onUpdate((x) => {
      incomingRune.rendering.colour.alpha = x.alpha;
      incomingRune.rendering.colour.saturation = x.saturation;
      incomingRune.rendering.thickness = x.thickness;
    })
    .onComplete(() => {
      incomingRune.state.send({ type: "done" });
    });

  incomingRune.animations.burning.step1.tween.chain(
    incomingRune.animations.burning.step2.tween,
  );

  incomingRune.animations.burning.step1.tween.start();
};
