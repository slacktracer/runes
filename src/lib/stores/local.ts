import { type Writable, writable } from 'svelte/store';
import type { LocalState } from '$lib/types/LocalState.js';
import { makeTile } from '$lib/core/make-tile.js';
import { makeAdjacentTilesMap } from '../core/make-adjacent-tiles-map.js';

export const local: Writable<LocalState> = writable({
	adjacentTilesMap: makeAdjacentTilesMap({ height: 5, width: 4 }),
	tiles: Array.from({ length: 20 }).map(makeTile)
});
