import type { makeEventBus } from "../make-event-bus";

export type EventBus = ReturnType<typeof makeEventBus>;
