import { local } from '$lib/stores/local.js';
import { executeMove } from '$lib/core/execute-move.js';
import { get } from 'svelte/store';
import { makeRandomRound } from '$lib/core/make-random-round.js';

export const executeRandomRound = async () => {
	const localStore = get(local);

	const randomRound = makeRandomRound();

	for (const move of randomRound) {
		await executeMove({ move, tiles: localStore.tiles });

		if (localStore.finished) {
			break;
		}
	}
};
