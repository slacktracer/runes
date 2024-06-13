export { gameState } from "./game-state.js";

import { browser } from "$app/environment";

import { STOP_TICKING_IN_X_MILLISECONDS } from "./config/values";
import { connectToWebSocketServer } from "./connect-to-web-socket-server";
import { gameState } from "./game-state.js";
import { mainEventBus } from "./main-event-bus";
import { makeIncomingRune } from "./modules/rune/make-incoming-rune/make-incoming-rune";
import { makeRune } from "./modules/rune/make-rune/make-rune.js";
import { renderRune } from "./modules/rune/render-rune";
import { updateRune } from "./modules/rune/update-rune/update-rune";
import { startTicking } from "./start-ticking.js";

if (browser && mainEventBus) {
  connectToWebSocketServer({ eventBus: mainEventBus });

  gameState.oRune = makeRune();
  gameState.rune = makeRune();

  const stopTicking = startTicking({ eventBus: mainEventBus });

  if (STOP_TICKING_IN_X_MILLISECONDS) {
    setTimeout(stopTicking, STOP_TICKING_IN_X_MILLISECONDS);
  }

  mainEventBus.on("tick", ({ detail: timestamp }: CustomEvent) => {
    updateRune({ rune: gameState.rune, timestamp });

    if (gameState.renderingContext) {
      gameState.renderingContext.clearRect(
        0,
        0,
        gameState.canvasWidth,
        gameState.canvasHeight,
      );

      renderRune({
        renderingContext: gameState.renderingContext,
        rune: gameState.rune,
      });
    }
  });

  mainEventBus.on("incoming-rune", (event: CustomEvent) => {
    const { vertices } = event.detail.data;

    if (vertices.length) {
      const incomingRune = makeIncomingRune({ vertices });

      incomingRune.state.send({ type: "start" });
      incomingRune.state.send({ type: "move" });
      incomingRune.state.send({ type: "end" });

      gameState.theirRunes.push(incomingRune);
    }
  });
}
