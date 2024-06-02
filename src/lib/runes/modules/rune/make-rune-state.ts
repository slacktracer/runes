import { createActor, createMachine } from "xstate";

export const makeRuneState = () =>
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
            end: { target: "finishing" },
            wentOutOfBounds: { target: "outOfBounds" },
          },
        },
        outOfBounds: {
          on: {
            backWithinBounds: { target: "carving" },
            end: { target: "finishing" },
          },
        },
        finishing: {
          on: { done: { target: "ready" } },
        },
      },
    }),
  );
