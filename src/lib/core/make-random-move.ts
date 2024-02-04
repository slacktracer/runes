import { get } from 'svelte/store';
import { local } from '$lib/stores/local.js';
import { getRandomIntegerInclusive } from '$lib/core/get-random-integer-inclusive.js';
import { makeRune } from '$lib/core/make-rune.js';
import { makeMove } from '$lib/core/make-move.js';

export const makeRandomMove = () => {
	const localStore = get(local);

	let size = getRandomIntegerInclusive({ max: 5, min: 2 });

	// very messy logic inside this .update. Refactor later, maybe.
	local.update((state) => {
		if (size > state.enemyPoints) {
			size = state.enemyPoints;
		}

		state.enemyPoints -= size;

		if (state.enemyPoints === 1) {
			size -= 1;
			state.enemyPoints += 1;
		}

		if (state.enemyPoints === 0) {
			state.finished = true;
		}

		return state;
	});

	const rune = makeRune({
		adjacentTilesMap: localStore.adjacentTilesMap,
		size
	});

	return makeMove({
		delay: 500,
		rune
	});
};
