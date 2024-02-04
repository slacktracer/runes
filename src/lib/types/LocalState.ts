import type { Tile } from '$lib/types/Tile.js';
import type { Move } from '$lib/types/Move.js';

export type LocalState = {
	adjacentTilesMap: number[][];
	currentMove: Move | undefined;
	enemyPoints: number;
	finished: boolean;
	life: number;
	tiles: Tile[];
};
