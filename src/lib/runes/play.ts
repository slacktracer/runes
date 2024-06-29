import { browser } from "$app/environment";

import { STOP_TICKING_IN_X_MILLISECONDS } from "./config/values";
import { connectToWebSocketServer } from "./connect-to-web-socket-server";
import { gameState } from "./game-state.js";
import { local } from "./local";
import { mainEventBus } from "./main-event-bus";
import { renderCounterRune } from "./modules/counter-rune/render-counter-rune";
import { updateCounterRune } from "./modules/counter-rune/update-counter-rune";
import { makeIncomingRune } from "./modules/incoming-rune/make-incoming-rune";
import { renderIncomingRune } from "./modules/incoming-rune/render-incoming-rune";
import { updateIncomingRune } from "./modules/incoming-rune/update-incoming-rune";
import { makeRune } from "./modules/rune/make-rune.js";
import { renderRune } from "./modules/rune/render-rune";
import { updateRune } from "./modules/rune/update-rune";
import { startTicking } from "./start-ticking.js";

export { gameState } from "./game-state.js";

if (browser && mainEventBus) {
  connectToWebSocketServer({ eventBus: mainEventBus });

  gameState.rune = makeRune();

  const stopTicking = startTicking({ eventBus: mainEventBus });

  if (STOP_TICKING_IN_X_MILLISECONDS) {
    setTimeout(stopTicking, STOP_TICKING_IN_X_MILLISECONDS);
  }

  mainEventBus.on("tick", ({ detail: timestamp }: CustomEvent) => {
    updateRune({ rune: gameState.rune, timestamp });

    if (gameState.renderingContextA) {
      gameState.renderingContextA.clearRect(
        0,
        0,
        gameState.canvasWidth,
        gameState.canvasHeight,
      );

      renderRune({
        renderingContext: gameState.renderingContextA,
        rune: gameState.rune,
      });

      if (gameState.renderingContextB) {
        gameState.renderingContextB.clearRect(
          0,
          0,
          gameState.canvasWidth,
          gameState.canvasHeight,
        );

        for (const incomingRune of gameState.theirRunes) {
          updateIncomingRune({ incomingRune, timestamp });

          renderIncomingRune({
            incomingRune,
            renderingContext: gameState.renderingContextB,
          });
        }

        updateCounterRune({ counterRune: gameState.counterRune, timestamp });

        renderCounterRune({
          counterRune: gameState.counterRune,
          renderingContext: gameState.renderingContextB,
        });
      }
    }
  });

  mainEventBus.on("incoming-rune", (event: CustomEvent) => {
    const { vertices } = event.detail.data;

    if (vertices.length) {
      const incomingRune = makeIncomingRune({ vertices });

      incomingRune.state.send({ type: "land" });

      gameState.theirRunes.push(incomingRune);
    }
  });

  mainEventBus.on("new-vertex", () => {
    local.update((state) => {
      if (state.stamina > 0) {
        state.stamina -= 1;
      }

      gameState.stamina = state.stamina;

      if (gameState.stamina < 1) {
        console.log(gameState.stamina);
        accumulator -= 3000;
      }

      return state;
    });
  });

  let previousTimestamp = 0;
  let accumulator = 0;

  mainEventBus.on("tick", ({ detail: timestamp }) => {
    if (gameState.stamina > 99) {
      return;
    }

    if (!previousTimestamp) {
      previousTimestamp = timestamp;
    }

    accumulator += timestamp - previousTimestamp;

    // console.log(accumulator);

    previousTimestamp = timestamp;

    while (accumulator > 400) {
      accumulator -= 400;

      local.update((state) => {
        if (state.stamina < 60) {
          state.stamina += 1;
        }

        gameState.stamina = state.stamina;

        return state;
      });
    }
  });
}
