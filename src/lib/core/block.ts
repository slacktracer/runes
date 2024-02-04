import { local } from '$lib/stores/local.js';
import { get } from 'svelte/store';

const localStore = get(local);

let previousElement: Element | null;

export const block = (event: TouchEvent) => {
	if (!event.touches[0]) {
		return;
	}

	const element = document.elementFromPoint(
		event.touches[0].pageX,
		event.touches[0].pageY
	);

	if (
		element !== previousElement &&
		element instanceof HTMLElement &&
		Number.isInteger(Number(element.dataset.index)) &&
		localStore.tiles[Number(element.dataset.index)].belongsToRune
	) {
		local.update((state) => {
			state.tiles[Number(element.dataset.index)].blocked = true;

			const moveWasBlocked = state.currentMove?.rune.every(
				(piece) => state.tiles[piece].blocked
			);

			if (moveWasBlocked && !state.currentMove?.blocked) {
				state.currentMove?.rune.forEach((piece) => {
					state.tiles[piece].belongsToBlockedRune = true;
					state.tiles[piece].belongsToRune = false;
				});

				if (state.currentMove) {
					state.currentMove.blocked = true;

					setTimeout(() => {
						state.currentMove?.rune.forEach((piece) => {
							local.update((state) => {
								state.tiles[piece].belongsToBlockedRune = false;
								state.tiles[piece].belongsToMissedRune = false;
								state.tiles[piece].belongsToRune = false;
								state.tiles[piece].blocked = false;

								return state;
							});
						});
					}, 200);
				}
			}

			return state;
		});
	}

	previousElement = element;
};
