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
          on: { done: { target: "running" } },
        },
        running: {
          on: { done: { target: "hitting" } },
        },
        hitting: {
          on: { done: { target: "burning" } },
        },
        burning: {
          on: { done: { target: "done" } },
        },
        done: {
          on: { reset: { target: "ready" } },
        },
      },
    }),
  );
