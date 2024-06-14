import type { Rune } from "./Rune";

export type IncomingRune = Omit<
  Rune,
  "animations" | "dimensions" | "input" | "outOfBounds" | "stylus"
>;
