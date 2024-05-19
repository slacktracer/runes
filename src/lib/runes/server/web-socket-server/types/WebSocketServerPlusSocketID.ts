import type { WebSocketServer } from "ws";

import type { WebSocketPlusSocketID } from "./WebSocketPlusSocketID.js";

export type WebSocketServerPlusSocketID = WebSocketServer & {
  clients: Set<WebSocketPlusSocketID>;
  on(
    callback: (webSocket: WebSocketPlusSocketID) => void,
    handleUpgrade: (client: WebSocketPlusSocketID, request: Request) => void,
  ): unknown;
};
