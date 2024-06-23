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

      const { counterRune } = gameState;

      const { left, top } = canvas.getBoundingClientRect();

      counterRune.dimensions.left = left;
      counterRune.dimensions.top = top;

      canvas.addEventListener("touchend", (event: TouchEvent) => {
        const [{ clientX: x, clientY: y }] = event.changedTouches;

        counterRune.input.touchEnd = true;
        counterRune.input.touchPosition = { x, y };
      });

      canvas.addEventListener("touchmove", (event: TouchEvent) => {
        const [{ clientX: x, clientY: y }] = event.changedTouches;

        counterRune.input.touchMove = true;
        counterRune.input.touchPosition = { x, y };
      });

      canvas.addEventListener("touchstart", (event: TouchEvent) => {
        const { left, top } = canvas.getBoundingClientRect();

        counterRune.dimensions.left = left;
        counterRune.dimensions.top = top;

        const [{ clientX: x, clientY: y }] = event.changedTouches;

        counterRune.input.touchStart = true;
        counterRune.input.touchPosition = { x, y };
      });
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
