import type { Move } from '$lib/types/Move.js';
import type { Tile } from '$lib/types/Tile.js';
import { local } from '$lib/stores/local.js';
import { applyDamage } from '$lib/core/apply-damage.js';

export const executeMove = ({ move }: { move: Move; tiles: Tile[] }) => {
	local.update((state) => {
		state.currentMove = move;

		return state;
	});

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
			if (move.blocked) {
				return;
			}

			move.rune.forEach((piece) => {
				local.update((state) => {
					state.tiles[piece].belongsToMissedRune = true;

					return state;
				});
			});

			applyDamage({ move });
		}, move.delay + move.timeToLive);

		setTimeout(
			() => {
				move.rune.forEach((piece) => {
					local.update((state) => {
						state.tiles[piece].belongsToBlockedRune = false;
						state.tiles[piece].belongsToMissedRune = false;
						state.tiles[piece].belongsToRune = false;
						state.tiles[piece].blocked = false;

						return state;
					});
				});

				resolve();
			},
			move.delay + move.timeToLive + 200
		);
	});
};
