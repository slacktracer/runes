<script lang="ts">
  let rotated = false;

  let turn = () => (rotated = !rotated);
</script>

<div class="shard-container">
  <div
    class:rotated
    class="shard transitionable"
    on:click={turn}
    on:keypress={turn}
    role="button"
    tabindex="0"
  >
    <div class="side front">
      <slot name="o-portal" />
    </div>
    <div class="side left"></div>
    <div class="side top"></div>
    <div class="side bottom"></div>
    <div class="side right"></div>
    <div class="side back"></div>
  </div>
</div>

<style>
  .shard-container {
    display: flex;
    height: 100%;
    justify-content: center;
    perspective: 1010px;
    position: relative;
    top: -650px;
  }

  .shard {
    --inner-shadow-blur: 80px;
    --inner-shadow-colour: #fff;
    --shard-height: 600px;
    --shard-thickness: 100px;
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
    background: hsla(360, 10%, 10%, 0.6);
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
    opacity: 0.4;
    position: absolute;
    z-index: -1;
  }

  :is(.front, .back, .left, .right) {
    height: var(--shard-height);
  }

  .side:is(.front, .back) {
    pointer-events: none;
  }

  :is(.left, .right) {
    backdrop-filter: blur(2px);
  }

  .front {
    transform: translateZ(calc((var(--shard-thickness) / 2)));
  }

  .back {
    transform: rotateY(180deg) translateZ(calc(var(--shard-thickness) / 2));
  }

  .left {
    transform: rotateY(-90deg) translateZ(calc((var(--shard-thickness) / 2)));
    width: var(--shard-thickness);
  }

  .right {
    transform: rotateY(90deg)
      translateZ(calc(var(--shard-width) + (var(--shard-thickness) / -2)));
    width: var(--shard-thickness);
  }

  .top {
    height: var(--shard-thickness);
    transform: rotateX(90deg) translateZ(calc(var(--shard-thickness) / 2));
  }

  .bottom {
    height: var(--shard-thickness);
    transform: rotateX(-90deg)
      translateZ(calc(var(--shard-height) + (var(--shard-thickness) / -2)));
  }

  .transitionable {
    transition: transform 0.8s;
  }

  .rotated {
    transform: rotateY(180deg);
  }
</style>
