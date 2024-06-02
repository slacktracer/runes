import { createActor, createMachine } from "xstate";

export const makeRuneStateActor = () =>
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

// const x = makeRuneStateActor().start();
//
// x.subscribe((snapshot) => {
//   console.log("Value:", snapshot.value);
// });
//
// x.send({ type: "start" });
// x.send({ type: "move" });
// const snapshot = x.getSnapshot();
//
// console.log(snapshot.matches("started"));
// console.log(snapshot.matches("carving"));
