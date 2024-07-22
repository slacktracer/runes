import type { WebSocket } from "ws";

export type WebSocketPlusSocketID = WebSocket & { socketID: string };
