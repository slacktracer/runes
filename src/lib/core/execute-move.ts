import type { Move } from '$lib/types/Move.js';
import type { Tile } from '$lib/types/Tile.js';
import { local } from '$lib/stores/local.js';

export const executeMove = ({ move }: { move: Move; tiles: Tile[] }) => {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			move.rune.forEach((piece) => {
				local.update((state) => {
					state.tiles[piece].belongsToRune = true;

					return state;
				});
			});
		}, move.delay);

		setTimeout(() => {
			move.rune.forEach((piece) => {
				local.update((state) => {
					state.tiles[piece].belongsToMissedRune = true;

					return state;
				});
			});
		}, move.delay + move.timeToLive);

		setTimeout(
			() => {
				move.rune.forEach((piece) => {
					local.update((state) => {
						state.tiles[piece].belongsToRune = false;
						state.tiles[piece].belongsToMissedRune = false;

						return state;
					});
				});

				resolve();
			},
			move.delay + move.timeToLive + 250
		);
	});
};
