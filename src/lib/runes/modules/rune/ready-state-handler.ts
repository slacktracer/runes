import type { Rune } from "../../types/Rune.js";
import { handleStartInput } from "./handle-start-input.js";

export const readyStateHandler = ({ rune }: { rune: Rune }) => {
  if (rune.input.touchStart) {
    handleStartInput({ rune });

    rune.state.send({ type: "start" });
  }
};
