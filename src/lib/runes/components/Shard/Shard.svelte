<script lang="ts">
  import { local } from "../../local.js";
  import { mainEventBus } from "../../main-event-bus.js";
  import SBHUD from "../SBHUD.svelte";
  import SBHUDContainer from "../SBHUDContainer.svelte";

  let rotated = false;

  let turn = () => (rotated = !rotated);

  if (mainEventBus) {
    mainEventBus.on("turn", turn);
  }
</script>

<div class="shard-container">
  <div class:rotated class="shard transitionable" role="button" tabindex="0">
    <div class="side front">
      <slot name="o-portal" />
    </div>
    <div class="side left"></div>
    <div class="side top"></div>
    <div class="side bottom"></div>
    <div class="side right"></div>
    <div class="side back">
      <slot name="o-side" />
    </div>
  </div>
</div>

{#if $local.misses < 1}
  <div>YOU LOSE</div>
{:else}
  <SBHUDContainer>
    <SBHUD>
      <div slot="a">
        SHIELD
        <br />
        {$local.misses}
      </div>

      <div slot="b">
        STAMINA
        <br />
        {$local.stamina}
      </div>
    </SBHUD>
  </SBHUDContainer>
{/if}

<style>
  .shard-container {
    display: flex;
    height: 100%;
    justify-content: center;
    outline: none;
    perspective: 3030px;
    position: relative;
    top: -650px;
  }

  .shard {
    --half-shard-thickness: calc(var(--shard-thickness) / 2);
    --inner-shadow-blur: 40px;
    --inner-shadow-colour: #fff;
    /* todo */
    /* I probably want to set these values in the values file */
    /* and then set these CSS custom properties inside the script tag */
    --shard-height: 500px;
    --shard-thickness: 20px;
    --shard-width: 320px;

    display: flex;
    height: var(--shard-height);
    position: relative;
    transform-style: preserve-3d;
    translate: 0 700px 0;
    width: var(--shard-width);
  }

  .side {
    backdrop-filter: blur(1px);
    background: hsla(360, 5%, 5%, 0.6);
    box-shadow: 0 0 var(--inner-shadow-blur) var(--inner-shadow-colour) inset;
    display: flex;
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .side::before {
    background-image: url("data:image/svg+xml, %3C!-- svg: first layer --%3E%3Csvg viewBox='0 0 171 171' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.74' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    content: "";
    inset: 0;
    opacity: 0.3;
    position: absolute;
    z-index: -1;
  }

  :is(.front, .back, .left, .right) {
    height: var(--shard-height);
  }

  .side:is(.front, .back) {
    pointer-events: none;
  }

  :is(.left, .right, .top, .bottom) {
    backdrop-filter: blur(2px);
  }

  .front {
    transform: translateZ(calc((var(--half-shard-thickness))));
  }

  .back {
    transform: rotateY(180deg) rotateZ(180deg)
      translateZ(calc(var(--half-shard-thickness)));
  }

  .left {
    transform: rotateY(-90deg) translateZ(calc((var(--half-shard-thickness))));
    width: var(--shard-thickness);
  }

  .right {
    transform: rotateY(90deg)
      translateZ(calc(var(--shard-width) + (var(--half-shard-thickness)) * -1));
    width: var(--shard-thickness);
  }

  .top {
    height: var(--shard-thickness);
    transform: rotateX(90deg) translateZ(calc(var(--half-shard-thickness)));
  }

  .bottom {
    height: var(--shard-thickness);
    transform: rotateX(-90deg)
      translateZ(
        calc((var(--shard-height) + (var(--half-shard-thickness)) * -1))
      );
  }

  .transitionable {
    transition: transform 300ms;
    /*transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);*/
    transition-timing-function: ease-in;
  }

  .rotated {
    transform: rotateX(180deg);
  }
</style>
