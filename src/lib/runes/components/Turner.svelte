<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  let turnerAnimation: Animation;
  let turnerAnimationIsPlaying = false;

  onMount(() => {
    turnerAnimation = turner.animate(
      [
        {
          offset: 0.5,
          transform: "scale(1.1)",
        },
      ],
      {
        duration: 500,
        easing: "cubic-bezier(0.68, -0.67, 0.27, 1.55)",
      },
    );

    turnerAnimation.pause();
  });

  let turner: HTMLDivElement;

  let turn = () => {
    if (turnerAnimationIsPlaying) {
      turnerAnimation.reverse();
    }

    turnerAnimation.play();

    turnerAnimationIsPlaying = true;

    dispatch("turn");
  };
</script>

<div class="turner-container">
  <div bind:this={turner} class="turner" on:touchstart={turn}></div>
</div>

<style>
  .turner-container {
    display: flex;
    justify-content: center;
    text-align: center;
    translate: 0 6rem;
  }

  .turner {
    background-color: hsla(360, 0%, 100%, 0.2);
    backdrop-filter: blur(2px);
    border-radius: 50%;
    box-shadow:
      0 0 20px #aaa inset,
      0 0 5px #aaa;
    padding: 2.5rem;
  }

  .turner::before {
    background-image: url("data:image/svg+xml, %3C!-- svg: first layer --%3E%3Csvg viewBox='0 0 171 171' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.74' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    border-radius: 50%;
    content: "";
    inset: 0;
    opacity: 0.3;
    position: absolute;
    z-index: -1;
  }
</style>
