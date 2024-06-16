import { LazyBrush } from "lazy-brush";

export const makeStylus = ({ radius }: { radius: number }) =>
  new LazyBrush({ radius });
