import type { RuneInput } from "../../types/RuneInput.js";

export const resetRuneInput = ({ runeInput }: { runeInput: RuneInput }) => {
  runeInput.touchEnd = false;
  runeInput.touchMove = false;
  runeInput.touchPosition = { x: 0, y: 0 };
  runeInput.touchStart = false;
};