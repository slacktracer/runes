<script lang="ts">
	import type { Tile } from '$lib/types/Tile.js';

	export let tile: Tile;
</script>

<div
	class="tile"
	class:belongsToRune={tile.belongsToRune}
	class:belongsToMissedRune={tile.belongsToRune && tile.belongsToMissedRune}
	class:belongsToBlockedRune={tile.belongsToBlockedRune}
	data-index={tile.index}
>
	{#if !tile.belongsToBlockedRune && !tile.belongsToMissedRune && tile.blocked}
		<span class="blocked">&#x2298;</span>
	{/if}
</div>

<style>
	@keyframes appear {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.tile {
		align-items: center;
		aspect-ratio: 1 / 1;
		/*border: 1px solid ghostwhite;*/
		display: flex;
		justify-content: center;
		opacity: 1;
	}

	.belongsToRune {
		animation: appear 50ms ease-in;
		background: #0077b6;
	}

	.belongsToBlockedRune {
		background: seagreen;
	}

	.belongsToMissedRune {
		background: red;
	}

	.blocked {
		color: #00a6ff;
		font-size: 2.25rem;
		line-height: 29px;
	}
</style>
