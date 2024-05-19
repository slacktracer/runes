<script lang="ts">
  import { animateToBack } from "./animate-to-back.js";
  import { animateToFront } from "./animate-to-front.js";

  let outgoingPortal: HTMLDivElement;

  let inFront = true;

  let running = false;

  const move = async () => {
    if (running) {
      return;
    }

    running = true;

    if (inFront) {
      await animateToBack({ outgoingPortal });
    } else {
      await animateToFront({ outgoingPortal });
    }

    inFront = !inFront;

    running = false;
  };
</script>

<section class="portals-container">
  <div
    class="portals"
    on:click={move}
    on:keypress={move}
    role="button"
    tabindex="0"
  >
    <div class="incoming portal"></div>
    <div bind:this={outgoingPortal} class="outgoing portal"></div>
  </div>
</section>

<style>
  .portals-container {
    display: grid;
    height: 100dvh;
    justify-content: center;
    margin-top: 4rem;
    perspective: 500px;
    width: 100dvw;
  }

  .portals {
    --portal-height: 600px;
    --portal-width: 300px;

    all: unset;
    height: var(--portal-height);
    position: relative;
    transform-style: preserve-3d;
    width: var(--portal-width);
  }

  .portal {
    backdrop-filter: blur(2px);
    background-color: hsla(0, 0%, 100%, 0.8);
    height: var(--portal-height);
    position: absolute;
    width: var(--portal-width);
  }

  .portal::before {
    background-image: url("data:image/svg+xml, %3C!-- svg: first layer --%3E%3Csvg viewBox='0 0 171 171' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.74' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    content: "";
    inset: 0;
    opacity: 0.25;
    position: absolute;
    z-index: -1;
  }

  .outgoing {
    animation: outgoing-enter 1s;
    translate: -15px -15px 20px;
  }

  @keyframes outgoing-enter {
    0% {
      transform: translateX(-1000px);
    }
  }

  .incoming {
    animation: incoming-enter 1s;
    translate: 15px 15px 0;
  }

  @keyframes incoming-enter {
    0% {
      transform: translateY(-1000px);
    }
  }
</style>
