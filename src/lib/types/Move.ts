import type { Rune } from '$lib/types/Rune.js';

export type Move = {
	blocked: boolean;
	delay: number;
	rune: Rune;
	started: boolean;
	timeToLive: number;
};
