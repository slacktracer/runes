<script lang="ts">
	import { local } from '$lib/stores/local.js';
	import Tile from '$lib/components/Tile.svelte';

	import { ws } from '../core/ws.js';

	const reload = () => window.location.reload();

	let rune = [];

	let touchstarted = false;

	const touchstart = (event) => {
		if (event.touches.length > 1) {
			$local.tiles.forEach((tile) => {
				tile.belongsToRune = false;
			});

			$local.tiles = $local.tiles;

			ws.send(JSON.stringify(rune));

			rune = [];
		} else {
			touchstarted = true;
		}
	};

	const touchend = () => {
		touchstarted = false;
	};

	let previousElement: Element | null;

	const make = (event: TouchEvent) => {
		if (!touchstarted) {
			return;
		}

		if (!event.touches?.[0] && !(event.type === 'mousemove')) {
			return;
		}

		const element = document.elementFromPoint(
			(event.touches?.[0] || event).pageX,
			(event.touches?.[0] || event).pageY
		);

		if (
			element !== previousElement &&
			element instanceof HTMLElement &&
			Number.isInteger(Number(element.dataset.index))
		) {
			rune.push(element.dataset.index);

			$local.tiles[element.dataset.index].belongsToRune = true;

			console.log(rune);
		}

		previousElement = element;
	};

	const c = () => {
		console.log(ws);

		ws.send(JSON.stringify({ value: false }));

		// alert(0);
	};
</script>

<div class="wrapper">
	<div
		class="tiles"
		on:mousedown={touchstart}
		on:mouseup={touchend}
		on:mousemove={make}
		on:touchstart={touchstart}
		on:touchend={touchend}
		on:touchmove={make}
		on:dblclick={c}
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
