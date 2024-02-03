<script lang="ts">
	import type { Tile } from '$lib/types/Tile.js';

	export let tile: Tile;
</script>

<div
	class="tile"
	class:belongsToRune={tile.belongsToRune}
	class:belongsToMissedRune={tile.belongsToRune && tile.belongsToMissedRune}
	data-index={tile.index}
>
	<!--	<span style="color: lightgray">{tile.index}</span>-->
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
		background: #48cae4;
	}

	/*.belongsToBlockedRune {*/
	/*	background: green;*/
	/*}*/

	.belongsToMissedRune {
		background: red;
	}
</style>
