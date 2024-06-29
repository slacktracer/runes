import { writable } from "svelte/store";

type LocalState = {
  misses: number;
  spent: number;
  stamina: number;
};

export const local = writable<LocalState>({
  misses: 120,
  spent: 0,
  stamina: 60,
});
