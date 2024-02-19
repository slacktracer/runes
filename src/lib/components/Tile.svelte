<script lang="ts">
	import type { Tile } from '$lib/types/Tile.js';

	export let tile: Tile;
</script>

<div
	class="tile"
	class:belongsToBlockedRune={tile.belongsToBlockedRune}
	class:belongsToMissedRune={tile.belongsToRune && tile.belongsToMissedRune}
	class:belongsToRune={tile.belongsToRune}
	class:blocked={!tile.belongsToBlockedRune && tile.blocked}
	data-index={tile.index}
></div>

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
		opacity: 0.85;
	}
</style>
