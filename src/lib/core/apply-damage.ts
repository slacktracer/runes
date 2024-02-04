import type { Move } from '$lib/types/Move.js';
import { local } from '$lib/stores/local.js';

export const applyDamage = ({ move }: { move: Move }) => {
	let damage: number;

	switch (move.rune.length) {
		case 2:
			damage = 1;
			break;
		case 3:
			damage = 3;
			break;
		case 4:
			damage = 5;
			break;
		case 5:
			damage = 8;
			break;
		default:
			throw new Error('Unexpected rune length');
	}

	local.update((state) => {
		state.life -= damage;

		if (state.life <= 0) {
			state.finished = true;

			state.life = 0;
		}

		return state;
	});
};
