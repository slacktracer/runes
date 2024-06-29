import {
  COUNTER_RUNE_EFFECT_DISTANCE,
  COUNTER_RUNE_MAX_LENGTH,
} from "../../config/values";
import { mainEventBus } from "../../main-event-bus";
import { gameState } from "../../play";
import type { CounterRune } from "../../types/CounterRune";
import { handleMoveInput } from "./handle-move-input.js";

let deleteCount = 0;

export const carvingStateHandler = ({
  counterRune,
  timestamp,
}: {
  counterRune: CounterRune;
  timestamp: number;
}) => {
  if (counterRune.input.touchEnd) {
    counterRune.state.send({ type: "end" });

    return;
  }

  if (counterRune.vertices.length > COUNTER_RUNE_MAX_LENGTH) {
    counterRune.rendering.vertices.shift();
  }

  const counterRuneEnd = counterRune.vertices.at(-1);

  gameState.theirRunes.forEach((rune) => {
    if (counterRuneEnd) {
      const incomingRuneStart = rune.vertices.at(0);

      const incomingRuneEnd = rune.vertices.at(-1);

      if (incomingRuneStart) {
        const distance = Math.hypot(
          counterRuneEnd.x - incomingRuneStart.x,
          counterRuneEnd.y - incomingRuneStart.y,
        );

        if (distance < COUNTER_RUNE_EFFECT_DISTANCE) {
          rune.vertices.splice(0, 1);

          rune.rendering.vertices.splice(0, 1);

          deleteCount += 1;

          if (deleteCount >= 3) {
            deleteCount = 0;
            mainEventBus && mainEventBus.emit("new-vertex");
          }
        }
      }

      if (incomingRuneEnd) {
        const distance = Math.hypot(
          counterRuneEnd.x - incomingRuneEnd.x,
          counterRuneEnd.y - incomingRuneEnd.y,
        );

        if (distance < COUNTER_RUNE_EFFECT_DISTANCE) {
          const runeLength = rune.vertices.length;

          rune.vertices.splice(runeLength - 1, 1);

          rune.rendering.vertices.splice(runeLength - 1, 1);
        }
      }
    }
  });

  if (counterRune.input.touchMove) {
    handleMoveInput({ counterRune, timestamp });
  }
};
