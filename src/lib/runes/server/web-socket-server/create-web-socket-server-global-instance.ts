import { WebSocketServer } from "ws";

import { symbolForWebSocketServer } from "./symbol-for-web-socket-server.js";
import type { GlobalPlusWebSocketServer } from "./types/GlobalPlusWebSocketServer.js";
import type { WebSocketServerPlusSocketID } from "./types/WebSocketServerPlusSocketID.js";

export const createWebSocketServerGlobalInstance = () => {
  const webSocketServer = new WebSocketServer({ noServer: true });

  (global as GlobalPlusWebSocketServer)[symbolForWebSocketServer] =
    webSocketServer as WebSocketServerPlusSocketID;
};
