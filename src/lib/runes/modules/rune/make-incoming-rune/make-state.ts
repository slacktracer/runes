import { createActor, createMachine } from "xstate";

export const makeState = () =>
  createActor(
    createMachine({
      id: "incomingRuneStateMachine",
      initial: "ready",
      states: {
        ready: {
          on: { land: { target: "landing" } },
        },
        landing: {
          on: { done: { target: "ready" } },
        },
      },
    }),
  );
