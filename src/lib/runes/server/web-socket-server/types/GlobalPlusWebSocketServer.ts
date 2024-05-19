import { symbolForWebSocketServer } from "../symbol-for-web-socket-server.js";
import type { WebSocketServerPlusSocketID } from "./WebSocketServerPlusSocketID.js";

export type GlobalPlusWebSocketServer = typeof global & {
  [symbolForWebSocketServer]: WebSocketServerPlusSocketID;
};
