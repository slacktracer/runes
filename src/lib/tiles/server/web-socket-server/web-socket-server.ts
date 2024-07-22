import { symbolForWebSocketServer } from "./symbol-for-web-socket-server.js";
import type { GlobalPlusWebSocketServer } from "./types/GlobalPlusWebSocketServer.js";

export const webSocketServer = (global as GlobalPlusWebSocketServer)[
  symbolForWebSocketServer
];
