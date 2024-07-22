<script lang="ts">
  import { browser } from "$app/environment";

  import { connectToWebSocketServer } from "../../tiles/connect-to-web-socket-server.js";
  import { mainEventBus } from "../../tiles/main-event-bus.js";

  let tiles = {
    tileA1: { hit: false, on: false, time: 0 },
    tileA2: { hit: false, on: false, time: 0 },
    tileA3: { hit: false, on: false, time: 0 },
    tileB1: { hit: false, on: false, time: 0 },
    tileB2: { hit: false, on: false, time: 0 },
    tileB3: { hit: false, on: false, time: 0 },
    tileC1: { hit: false, on: false, time: 0 },
    tileC2: { hit: false, on: false, time: 0 },
    tileC3: { hit: false, on: false, time: 0 },
    tileD1: { hit: false, on: false, time: 0 },
    tileD2: { hit: false, on: false, time: 0 },
    tileD3: { hit: false, on: false, time: 0 },
    tileE1: { hit: false, on: false, time: 0 },
    tileE2: { hit: false, on: false, time: 0 },
    tileE3: { hit: false, on: false, time: 0 },
    tileF1: { hit: false, on: false, time: 0 },
    tileF2: { hit: false, on: false, time: 0 },
    tileF3: { hit: false, on: false, time: 0 },
    tileG1: { hit: false, on: false, time: 0 },
    tileG2: { hit: false, on: false, time: 0 },
    tileG3: { hit: false, on: false, time: 0 },
  };

  const state = {
    p1: { health: 1000, stamina: 750 },
    p2: { health: 1000, stamina: 750 },
  };

  let ws: WebSocket;

  if (browser && mainEventBus) {
    const websocket = connectToWebSocketServer({ eventBus: mainEventBus });

    ws = websocket;

    mainEventBus.on("tile", (event) => {
      const tile = tiles[event.detail.data.id as keyof typeof tiles];

      tile.hit = true;

      tile.time = event.detail.data.time;

      tile.hitTime = performance.now();

      setTimeout(() => {
        if (tile.hit === false) {
          return;
        }

        tile.hit = false;

        state.p1.health -= Math.round(Math.max(tile.time - 250, 0));

        if (state.p1.health <= 0) {
          setTimeout(() => {
            window.alert("You lose!");
            window.history.go(-1);
          }, 10);
        }

        tiles = tiles;

        ws?.send(
          JSON.stringify({
            data: { p1Health: state.p1.health },
            type: "hit",
          }),
        );
      }, tile.time + 250);

      tiles = tiles;
    });

    mainEventBus.on("hit", (event) => {
      state.p2.health = event.detail.data.p1Health;
    });

    setInterval(() => {
      state.p1.stamina += 15;

      state.p1.stamina = Math.min(state.p1.stamina, 750);

      const e = document.querySelector(".stamina");

      const v = state.p1.stamina / 750;

      if (e) {
        e.style.setProperty("--scale", v);
      }
    }, 50);
  }

  const start = (event: TouchEvent) => {
    if (state.p1.stamina <= 0) {
      return;
    }

    const { target } = event;

    if (target instanceof HTMLDivElement) {
      const tile = tiles[target.id as keyof typeof tiles];

      if (target.dataset.target) {
        tile.on = true;

        tile.time = performance.now();

        tiles = tiles;

        return;
      }

      if (tile.hit) {
        tile.hit = false;

        state.p1.health -= Math.round(
          Math.max(performance.now() - tile.hitTime - 250, 0),
        );

        tiles = tiles;

        ws?.send(
          JSON.stringify({
            data: { p1Health: state.p1.health },
            type: "hit",
          }),
        );
      }
    }
  };

  const end = (event: TouchEvent) => {
    const { target } = event;

    if (target instanceof HTMLDivElement) {
      const tile = tiles[target.id as keyof typeof tiles];

      if (target.dataset.target) {
        tile.on = false;

        tile.time = performance.now() - tile.time;

        state.p1.stamina -= Math.round(Math.min(Math.round(tile.time), 500));

        if (state.p1.stamina < 0) {
          state.p1.stamina = 0;
        }

        if (state.p1.stamina <= 500) {
          tile.time = Math.min(tile.time, state.p1.stamina);
        }

        console.log(state.p1.stamina);
        console.log(tile.time);

        const e = document.querySelector(".stamina");

        const v = state.p1.stamina / 750;

        if (e) {
          e.style.setProperty("--scale", v);
        }

        tiles = tiles;

        ws?.send(
          JSON.stringify({
            data: {
              id: target.dataset.target,
              time: Math.min(Math.round(tile.time), 500),
            },
            type: "tile",
          }),
        );

        return;
      }
    }
  };
</script>

<div class="container">
  <div class="board" on:touchstart|preventDefault={start} on:touchend={end}>
    <div class="defence tile" class:hit={tiles.tileA1.hit} id="tileA1"></div>

    <div class="defence tile" class:hit={tiles.tileA2.hit} id="tileA2"></div>

    <div class="defence tile" class:hit={tiles.tileA3.hit} id="tileA3"></div>

    <div class="defence tile" class:hit={tiles.tileB1.hit} id="tileB1"></div>

    <div class="health">{Math.floor(state.p2.health / 10)}</div>

    <div class="defence tile" class:hit={tiles.tileB3.hit} id="tileB3"></div>

    <div class="defence tile" class:hit={tiles.tileC1.hit} id="tileC1"></div>

    <div></div>

    <div></div>

    <div></div>

    <div class="stamina-container">
      <div class="stamina"></div>
    </div>

    <div
      class="offense tile"
      class:on={tiles.tileD3.on}
      data-target="tileC1"
      id="tileD3"
    ></div>

    <div
      class="offense tile"
      class:on={tiles.tileE1.on}
      data-target="tileB3"
      id="tileE1"
    ></div>

    <div class="health">{Math.floor(state.p1.health / 10)}</div>

    <div
      class="offense tile"
      class:on={tiles.tileE3.on}
      data-target="tileB1"
      id="tileE3"
    ></div>

    <div
      class="offense tile"
      class:on={tiles.tileF1.on}
      data-target="tileA3"
      id="tileF1"
    ></div>

    <div
      class="offense tile"
      class:on={tiles.tileF2.on}
      data-target="tileA2"
      id="tileF2"
    ></div>

    <div
      class="offense tile"
      class:on={tiles.tileF3.on}
      data-target="tileA1"
      id="tileF3"
    ></div>
  </div>
</div>

<style>
  .container {
    display: grid;
    height: 100dvh;
    place-content: center;
  }

  .board {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px 100px 100px 100px;
    gap: 10px;
  }

  .tile {
    border-radius: 5px;
    background-color: #ede9dd;
    user-select: none;
  }

  .offense {
    transition: background-color 500ms;
  }

  .defence {
    transition: background-color 50ms;
  }

  .health {
    display: grid;
    font-size: 1.2rem;
    place-content: center;
    text-shadow: 1px 1px 5px #ede9dd;
  }

  .on {
    background-color: crimson;
  }

  .hit {
    background-color: crimson;
  }

  .stamina-container {
    display: grid;
    place-content: center;
  }

  .stamina {
    --scale: 1;
    --stamina: 50px;
    aspect-ratio: 1/1;
    background-color: #ede9dd;
    border-radius: 50%;
    transition: scale 50ms;
    width: var(--stamina);
    scale: var(--scale);
  }

  .stamina:hover {
    scale: 2;
  }
</style>
