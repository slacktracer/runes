import type { Tile } from '$lib/types/Tile.js';

export type LocalState = {
	adjacentTilesMap: number[][];
	tiles: Tile[];
};
