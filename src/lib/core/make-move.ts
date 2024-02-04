import type { Rune } from '$lib/types/Rune.js';
import type { Move } from '$lib/types/Move.js';

export const makeMove = ({
	delay,
	rune
}: {
	delay: number;
	rune: Rune;
}): Move => {
	const timeToLive = 300 + rune.length * 250;

	return {
		blocked: false,
		delay,
		rune,
		started: false,
		timeToLive
	};
};
