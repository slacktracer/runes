import { local } from '$lib/stores/local.js';
import { executeMove } from '$lib/core/execute-move.js';
import { get } from 'svelte/store';
import { makeRandomMove } from '$lib/core/make-random-move.js';

export const executeRandomRound = async () => {
	const localStore = get(local);

	let i = 0;

	while (i < 250) {
		const move = makeRandomMove();

		await executeMove({ move, tiles: localStore.tiles });

		if (localStore.finished) {
			break;
		}

		i += 1;
	}
};
