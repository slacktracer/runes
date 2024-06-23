import { gameState } from "../../play";
import type { CounterRune } from "../../types/CounterRune";
import { handleMoveInput } from "./handle-move-input.js";

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

  if (counterRune.vertices.length > 5) {
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

        if (distance < 60) {
          rune.vertices.splice(0, 1);
          rune.rendering.vertices.splice(0, 1);
        }
      }

      if (incomingRuneEnd) {
        const distance = Math.hypot(
          counterRuneEnd.x - incomingRuneEnd.x,
          counterRuneEnd.y - incomingRuneEnd.y,
        );

        if (distance < 60) {
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
