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

  let raf: number;

  let canvasHeight: number;
  let canvasWidth: number;

  onMount(() => {
    let lineWidth = 25;

    const context = canvas.getContext("2d");

    const ratio = 1; //Math.max(window.devicePixelRatio || 1, 1);

    canvasHeight = container.clientHeight * ratio;
    canvasWidth = container.clientWidth * ratio;

    if (context) {
      context.strokeStyle = $local.runeColour;

      context.lineWidth = lineWidth;

      context.lineCap = "round";

      canvas.addEventListener("touchstart", start);
      canvas.addEventListener("touchend", stop);
      canvas.addEventListener("touchmove", move);

      let previousTimeStamp: number | undefined;
      let seconds = 0;

      const loop = (timeStamp = 0) => {
        if (previousTimeStamp === undefined) {
          previousTimeStamp = timeStamp;
        }

        const elapsedTime = timeStamp - previousTimeStamp;

        seconds += Math.floor(elapsedTime);

        if ($local.carvingCoolDown > 0) {
          $local.carvingCoolDown -= Math.floor(elapsedTime);

          if ($local.carvingCoolDown <= 0) {
            $local.carvingCoolDown = 0;
          }
        }

        if ($local.carvingCoolDown <= 0) {
          if (seconds >= 100) {
            $local.carvingEnergy += 10;

            if ($local.carvingEnergy > 2500) {
              $local.carvingEnergy = 2500;
            }

            seconds = 0;
          }
        }

        context.clearRect(0, 0, canvas.width, canvas.height);

        draw({ context, rune: $local.rune, runeColour: $local.runeColour });

        previousTimeStamp = timeStamp;

        raf = requestAnimationFrame(loop);
      };

      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
    };
  });
</script>

<div class="container" bind:this={container}>
  <canvas bind:this={canvas} height={canvasHeight} width={canvasWidth}></canvas>
</div>

<style>
  .container {
    height: 600px;
    width: 300px;
  }

  canvas {
    touch-action: none;
  }
</style>
