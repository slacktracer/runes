import type { WebSocketPlusSocketID } from "./WebSocketPlusSocketID.js";
import type { WebSocketServerPlusSocketID } from "./WebSocketServerPlusSocketID.js";

export type WebSocketServerHandlers = {
  onMessage: (argument: {
    rawData: ArrayBuffer | Buffer | Buffer[];
    webSocket: WebSocketPlusSocketID;
    webSocketServer: WebSocketServerPlusSocketID;
  }) => void;
};
