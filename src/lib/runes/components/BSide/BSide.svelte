<script lang="ts">
  import { onMount } from "svelte";

  import { gameState } from "../../game-state.js";
  import { mainEventBus } from "../../main-event-bus.js";
  import { renderRune } from "../../modules/rune/render-rune.js";
  import { updateRune } from "../../modules/rune/update-rune/update-rune.js";
  import SideID from "../SideID.svelte";

  export let height: number;
  export let width: number;

  let canvas: HTMLCanvasElement;

  let canvasHeight: number;
  let canvasWidth: number;

  onMount(() => {
    const renderingContext = canvas.getContext("2d");

    canvasHeight = height || 200;
    canvasWidth = width || 200;

    if (renderingContext && mainEventBus) {
      const { oRune: rune } = gameState;

      canvas.addEventListener("touchend", (event: TouchEvent) => {
        const [{ clientX: x, clientY: y }] = event.changedTouches;

        // rune.input.touchEnd = true;
        rune.input.touchPosition = { x, y };
      });

      canvas.addEventListener("touchmove", (event: TouchEvent) => {
        const [{ clientX: x, clientY: y }] = event.changedTouches;

        // rune.input.touchMove = true;
        rune.input.touchPosition = { x, y };
      });

      canvas.addEventListener("touchstart", (event: TouchEvent) => {
        const { left, top } = canvas.getBoundingClientRect();

        rune.dimensions.left = left;
        rune.dimensions.top = top;

        const [{ clientX: x, clientY: y }] = event.changedTouches;

        // rune.input.touchStart = true;
        rune.input.touchPosition = { x, y };
      });

      if (mainEventBus) {
        mainEventBus.on("tick", ({ detail: timestamp }: CustomEvent) => {
          updateRune({ rune, timestamp });

          renderingContext.clearRect(0, 0, canvas.width, canvas.height);

          renderRune({ renderingContext, rune });

          for (const rune of gameState.theirRunes) {
            updateRune({ rune, timestamp });

            renderRune({ renderingContext, rune });
          }
        });
      }
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
