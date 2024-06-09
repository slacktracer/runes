import { browser } from "$app/environment";

import { gameState } from "../../game-state.js";
import { makeRune } from "../../modules/rune/make-rune/make-rune.js";
import { startTicking } from "../../start-ticking.js";

if (browser) {
  gameState.oRune = makeRune();
  gameState.rune = makeRune();

  /*const stopTicking = */ startTicking();

  // /*import.meta.env.TIMEOUT && */ setTimeout(stopTicking, 10000);
  // import.meta.env.TIMEOUT && setTimeout(stopTicking, import.meta.env.TIMEOUT);
}
