<script lang="ts">
  import { onMount } from "svelte";

  import { connectToWebSocketServer } from "../../connect-to-web-socket-server.js";
  import { gameState } from "../../game-state.js";
  import { mainEventBus } from "../../main-event-bus.js";
  import { input } from "../../modules/rune/input.js";
  import { updateRune } from "../../modules/rune/update-rune.js";
  import { draw } from "./draw.js";

  export let height: number;
  export let width: number;

  connectToWebSocketServer();

  let canvas: HTMLCanvasElement;

  let canvasHeight: number;
  let canvasWidth: number;

  onMount(() => {
    const context = canvas.getContext("2d");

    canvasHeight = height || 200;
    canvasWidth = width || 200;

    if (context && mainEventBus) {
      const { rune } = gameState;

      const { left, top } = canvas.getBoundingClientRect();

      rune.dimensions.left = left;
      rune.dimensions.top = top;

      canvas.addEventListener("touchstart", (event: TouchEvent) => {
        const [{ clientX: x, clientY: y }] = event.changedTouches;

        input.touchStart = true;
        input.touchStartPosition = { x, y };
      });

      canvas.addEventListener("touchend", (event: TouchEvent) => {
        const [{ clientX: x, clientY: y }] = event.changedTouches;

        input.touchEnd = true;
        input.touchEndPosition = { x, y };
      });

      canvas.addEventListener("touchmove", (event: TouchEvent) => {
        const [{ clientX: x, clientY: y }] = event.changedTouches;

        input.touchMove = true;
        input.touchMovePosition = { x, y };
      });

      if (mainEventBus) {
        mainEventBus.on("tick", ({ detail: timestamp }: CustomEvent) => {
          updateRune({ rune, timestamp });

          context.clearRect(0, 0, canvas.width, canvas.height);

          draw({ context, rune });
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
