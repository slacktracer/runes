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
            end: { target: "running" },
            wasNotViable: { target: "withering" },
            wentOutOfBounds: { target: "outOfBounds" },
          },
        },
        outOfBounds: {
          on: {
            backWithinBounds: { target: "carving" },
            end: { target: "running" },
          },
        },
        running: {
          on: { end: { target: "launching" } },
        },
        launching: {
          on: { end: { target: "ready" } },
        },
        withering: { on: { end: { target: "ready" } } },
      },
    }),
  );
