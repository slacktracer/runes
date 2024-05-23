<script lang="ts">
  import { onMount } from "svelte";

  import { connectToWebSocketServer } from "../../connect-to-web-socket-server.js";
  import { local } from "../../local.js";
  import { draw } from "./draw.js";
  import { move } from "./move.js";
  import { start } from "./start.js";
  import { stop } from "./stop.js";

  export let height: number;
  export let width: number;

  connectToWebSocketServer();

  let canvas: HTMLCanvasElement;

  let requestAnimationFrameID: number;

  let canvasHeight: number;
  let canvasWidth: number;

  onMount(() => {
    const context = canvas.getContext("2d");

    canvasHeight = height || 200;
    canvasWidth = width || 200;

    if (context) {
      canvas.addEventListener("touchstart", start);
      canvas.addEventListener("touchend", stop);
      canvas.addEventListener("touchmove", move);

      const loop = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);

        draw({ context, rune: $local.rune });

        requestAnimationFrameID = requestAnimationFrame(loop);
      };

      loop();
    }

    return () => {
      cancelAnimationFrame(requestAnimationFrameID);
    };
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
