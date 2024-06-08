import { createActor, createMachine } from "xstate";

export const makeState = () =>
  createActor(
    createMachine({
      id: "runeStateMachine",
      initial: "ready",
      states: {
        ready: {
          on: { start: { target: "started" } },
        },
        started: {
          on: { move: { target: "carving" } },
        },
        carving: {
          on: {
            end: { target: "finishingAndRunning" },
            wasNotViable: { target: "finishingAndWithering" },
            wentOutOfBounds: { target: "outOfBounds" },
          },
        },
        outOfBounds: {
          on: {
            backWithinBounds: { target: "carving" },
            end: { target: "finishingAndRunning" },
          },
        },
        finishingAndRunning: {
          on: { end: { target: "finishingAndGrowing" } },
        },
        finishingAndGrowing: {
          on: { end: { target: "ready" } },
        },
        finishingAndWithering: { on: { end: { target: "ready" } } },
      },
    }),
  );
