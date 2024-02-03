import type { Tile } from '$lib/types/Tile.js';

export const makeTile = (item: unknown, index: number): Tile => ({
	belongsToRune: false,
	belongsToMissedRune: false,
	index
});
