<script lang="ts">
	import { local } from '$lib/stores/local.js';
	import Tile from '$lib/components/Tile.svelte';
	// import { executeRandomRound } from '$lib/core/execute-random-round.js';
	import { block } from '$lib/core/block.js';
	import { makeMove } from '$lib/core/make-move.js';
	import { executeMove } from '$lib/core/execute-move.js';

	// const start = () => {
	// 	executeRandomRound();
	// };

	$: $local.move,
		(async () => {
			if ($local.move) {
				const { rune } = $local.move;
				$local.move = undefined;
				const move = makeMove({ delay: 100, rune });
				console.log(move);

				await executeMove({ move });
			}
		})();

	const reload = () => window.location.reload();
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

<div class="info">
	<div>
		LIFE
		<br />
		<span>{$local.life}</span>
	</div>

	<div>
		ENEMY
		<br />
		<span>{$local.enemyPoints}</span>
	</div>
</div>

<div class="action">
	<button on:click={reload}>Restart</button>
</div>

<div class="action">
	<a href="/runes/board">Go to board</a>
</div>

<style>
	:global(html, body) {
		overscroll-behavior: contain;
	}

	.wrapper {
		display: flex;
		justify-content: center;
		padding-top: 1rem;
	}

	.tiles {
		--gap: 0rem;
		--height: 16;
		--width: 10;

		border: 1px solid ghostwhite;
		display: grid;
		gap: var(--gap);
		grid-template-columns: repeat(var(--width), 1fr);
		grid-template-rows: repeat(var(--height), 1fr);
		padding: var(--gap);
		width: 300px;
	}

	.info {
		color: #666;
		display: grid;
		font-family: sans-serif;
		font-size: 1.2rem;
		grid-template-columns: 1fr 1fr;
		margin-block: 1rem 1rem;
		margin-inline: auto;
		padding: 1rem;

		& > div {
			text-align: center;

			& > span {
				font-weight: bold;
			}
		}
	}

	.action {
		text-align: center;
	}
</style>
