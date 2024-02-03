import { getRandomIntegerInclusive } from '$lib/core/get-random-integer-inclusive.js';
import type { Rune } from '$lib/types/Rune.js';

export const makeRune = ({
	adjacentTilesMap,
	size
}: {
	adjacentTilesMap: number[][];
	size: number;
}): Rune => {
	const rune: number[] = [];

	let tile = getRandomIntegerInclusive({
		max: adjacentTilesMap.length - 1,
		min: 0
	});

	rune.push(tile);

	let i = 1;

	do {
		const options = adjacentTilesMap[tile]
			.map((option) => {
				if (rune.includes(option)) {
					return undefined;
				}

				return option;
			})
			.filter(Boolean);

		const option = getRandomIntegerInclusive({
			max: options.length - 1,
			min: 0
		});

		const nextTile = options[option];

		if (nextTile) {
			rune.push(nextTile);

			tile = nextTile;
		}

		i += 1;
	} while (i < size);

	return rune;
};
