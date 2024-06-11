import type { Rune } from "./Rune";

export type IncomingRune = Omit<
  Rune,
  "dimensions" | "outOfBounds" | "stylus"
> & { incoming: true };
