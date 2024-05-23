<script lang="ts">
  import { onMount } from "svelte";

  import { connectToWebSocketServer } from "../../connect-to-web-socket-server.js";
  import { local } from "../../local.js";
  import { draw } from "./draw.js";
  import { move } from "./move.js";
  import { start } from "./start.js";
  import { stop } from "./stop.js";

  connectToWebSocketServer();

  let canvas: HTMLCanvasElement;
  let container: HTMLDivElement;

  let requestAnimationFrameID: number;

  let canvasHeight: number;
  let canvasWidth: number;

  onMount(() => {
    let lineWidth = 25;

    const context = canvas.getContext("2d");

    const ratio = 1;

    canvasHeight = container.clientHeight * ratio;
    canvasWidth = container.clientWidth * ratio;

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

<div class="container" bind:this={container}>
  <canvas bind:this={canvas} height={canvasHeight} width={canvasWidth}></canvas>
</div>

<style>
  .container {
    height: 600px;
    pointer-events: auto;
    width: 320px;
    z-index: -2;
  }

  canvas {
    touch-action: none;
  }
</style>
