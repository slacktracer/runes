import { writable } from "svelte/store";

type LocalState = {
  misses: number;
};

export const local = writable<LocalState>({
  misses: 0,
});
