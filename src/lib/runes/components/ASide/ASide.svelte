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
      gameState.renderingContextA = renderingContext;

      const { rune } = gameState;

      const { left, top } = canvas.getBoundingClientRect();

      rune.dimensions.left = left;
      rune.dimensions.top = top;

      canvas.addEventListener("touchend", (event: TouchEvent) => {
        const [{ clientX: x, clientY: y }] = event.changedTouches;

        rune.input.touchEnd = true;
        rune.input.touchPosition = { x, y };
      });

      canvas.addEventListener("touchmove", (event: TouchEvent) => {
        const [{ clientX: x, clientY: y }] = event.changedTouches;

        rune.input.touchMove = true;
        rune.input.touchPosition = { x, y };
      });

      canvas.addEventListener("touchstart", (event: TouchEvent) => {
        const { left, top } = canvas.getBoundingClientRect();

        rune.dimensions.left = left;
        rune.dimensions.top = top;

        const [{ clientX: x, clientY: y }] = event.changedTouches;

        rune.input.touchStart = true;
        rune.input.touchPosition = { x, y };
      });
    }
  });
</script>

<SideID>1</SideID>

<canvas bind:this={canvas} height={canvasHeight} width={canvasWidth}></canvas>

<style>
  canvas {
    touch-action: none;
    pointer-events: auto;
    z-index: -2;
  }
</style>
