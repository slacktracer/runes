<script lang="ts">
  import { onMount } from "svelte";

  import { gameState } from "../../game-state.js";
  import SideID from "../SideID.svelte";

  export let height: number;
  export let width: number;

  let canvas: HTMLCanvasElement;

  let canvasHeight: number;
  let canvasWidth: number;

  onMount(() => {
    const renderingContext = canvas.getContext("2d");

    canvasHeight = height;
    canvasWidth = width;

    if (renderingContext) {
      gameState.renderingContextB = renderingContext;
    }
  });
</script>

<SideID>0</SideID>

<canvas bind:this={canvas} height={canvasHeight} width={canvasWidth}></canvas>

<style>
  canvas {
    touch-action: none;
    pointer-events: auto;
    z-index: -2;
  }
</style>
