import type { Tile } from '$lib/types/Tile.js';

export const makeTile = (item: unknown, index: number): Tile => ({
	belongsToBlockedRune: false,
	belongsToMissedRune: false,
	belongsToRune: false,
	blocked: false,
	index
});
