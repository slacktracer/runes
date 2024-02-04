<script lang="ts">
	import { local } from '$lib/stores/local.js';
	import Tile from '$lib/components/Tile.svelte';
	import { executeRandomRound } from '$lib/core/execute-random-round.js';
	import { block } from '$lib/core/block.js';

	executeRandomRound();
</script>

<div class="wrapper">
	<div
		class="tiles"
		on:mousemove={block}
		on:touchmove={block}
		role="presentation"
	>
		{#each $local.tiles as tile}
			<Tile {tile}></Tile>
		{/each}
	</div>
</div>

<style>
	:global(html, body) {
		overscroll-behavior: contain;
	}

	.wrapper {
		display: flex;
		justify-content: center;
		padding-top: 2rem;
	}

	.tiles {
		--gap: 0.25rem;
		--height: 6;
		--width: 5;

		display: grid;
		gap: var(--gap);
		grid-template-columns: repeat(var(--width), 1fr);
		grid-template-rows: repeat(var(--height), 1fr);
		padding: var(--gap);
		width: 300px;
	}
</style>
