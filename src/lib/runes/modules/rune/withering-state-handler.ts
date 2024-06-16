import { Easing, Tween } from "@tweenjs/tween.js";

import type { Rune } from "../../types/Rune";
import { resetRune } from "./reset-rune";

export const witheringStateHandler = ({ rune }: { rune: Rune }) => {
  if (rune.animations.withering.tween) {
    rune.animations.withering.tween.update();

    rune.rendering.colour.saturation =
      rune.animations.withering.from.saturation;
    rune.rendering.shadowColour.saturation =
      rune.animations.withering.from.saturation;
    rune.rendering.thickness = rune.animations.withering.from.thickness;

    return;
  }

  rune.animations.withering.tween = new Tween(rune.animations.withering.from)
    .easing(Easing.Quadratic.Out)
    .to(rune.animations.withering.to, rune.animations.withering.duration)
    .onComplete(() => {
      rune.state.send({ type: "end" });

      resetRune({ rune });
    })
    .start();
};
