<script lang="ts">
  import { onMount } from "svelte";

  import { connectToWebSocketServer } from "../../connect-to-web-socket-server.js";
  import { gameState } from "../../game-state.js";
  import { mainEventBus } from "../../main-event-bus.js";
  import { renderRune } from "../../modules/rune/render-rune.js";
  import { runeInput } from "../../modules/rune/rune-input.js";
  import { updateRune } from "../../modules/rune/update-rune/update-rune.js";

  export let height: number;
  export let width: number;

  connectToWebSocketServer();

  let canvas: HTMLCanvasElement;

  let canvasHeight: number;
  let canvasWidth: number;

  onMount(() => {
    const renderingContext = canvas.getContext("2d");

    canvasHeight = height || 200;
    canvasWidth = width || 200;

    if (renderingContext && mainEventBus) {
      const { rune } = gameState;

      const { left, top } = canvas.getBoundingClientRect();

      rune.dimensions.left = left;
      rune.dimensions.top = top;

      canvas.addEventListener("touchend", (event: TouchEvent) => {
        const [{ clientX: x, clientY: y }] = event.changedTouches;

        runeInput.touchEnd = true;
        runeInput.touchPosition = { x, y };
      });

      canvas.addEventListener("touchmove", (event: TouchEvent) => {
        const [{ clientX: x, clientY: y }] = event.changedTouches;

        runeInput.touchMove = true;
        runeInput.touchPosition = { x, y };
      });

      canvas.addEventListener("touchstart", (event: TouchEvent) => {
        const [{ clientX: x, clientY: y }] = event.changedTouches;

        runeInput.touchStart = true;
        runeInput.touchPosition = { x, y };
      });

      if (mainEventBus) {
        mainEventBus.on("tick", ({ detail: timestamp }: CustomEvent) => {
          updateRune({ rune, timestamp });

          renderingContext.clearRect(0, 0, canvas.width, canvas.height);

          renderRune({ renderingContext, rune });
        });
      }
    }
  });
</script>

<canvas bind:this={canvas} height={canvasHeight} width={canvasWidth}></canvas>

<style>
  canvas {
    touch-action: none;
    pointer-events: auto;
    z-index: -2;
  }
</style>
