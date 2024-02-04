import { type Writable, writable } from 'svelte/store';
import type { LocalState } from '$lib/types/LocalState.js';
import { makeTile } from '$lib/core/make-tile.js';
import { makeAdjacentTilesMap } from '../core/make-adjacent-tiles-map.js';

export const local: Writable<LocalState> = writable({
	adjacentTilesMap: makeAdjacentTilesMap({ height: 6, width: 5 }),
	currentMove: undefined,
	finished: false,
	life: 50,
	tiles: Array.from({ length: 30 }).map(makeTile)
});
