import { type Writable, writable } from 'svelte/store';
import type { LocalState } from '$lib/types/LocalState.js';
import { makeTile } from '$lib/core/make-tile.js';
import { makeAdjacentTilesMap } from '../core/make-adjacent-tiles-map.js';

const height = 16;
const width = 10;

export const local: Writable<LocalState> = writable({
	adjacentTilesMap: makeAdjacentTilesMap({ height, width }),
	currentMove: undefined,
	enemyPoints: 60,
	finished: false,
	life: 20,
	tiles: Array.from({ length: height * width }).map(makeTile)
});
