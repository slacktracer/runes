import { get } from 'svelte/store';
import { local } from '$lib/stores/local.js';
import { makeRune } from '$lib/core/make-rune.js';
import { makeMove } from '$lib/core/make-move.js';
import { getRandomIntegerInclusive } from '$lib/core/get-random-integer-inclusive.js';

export const makeRandomRound = () => {
	const moves = Array.from({ length: 10 }).map(() => {
		const localStore = get(local);

		const rune = makeRune({
			adjacentTilesMap: localStore.adjacentTilesMap,
			size: getRandomIntegerInclusive({ max: 5, min: 2 })
		});

		return makeMove({
			delay: getRandomIntegerInclusive({ max: 25, min: 15 }) * 100,
			rune
		});
	});

	return moves;
};
