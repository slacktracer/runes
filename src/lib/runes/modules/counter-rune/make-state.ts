import { createActor, createMachine } from "xstate";

export const makeState = () =>
  createActor(
    createMachine({
      id: "counterRuneStateMachine",
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
            end: { target: "fading" },
          },
        },
        fading: {
          on: {
            end: { target: "ready" },
          },
        },
      },
    }),
  );
