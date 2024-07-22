import { webSocketServerOnMessageHandlers } from "../../core/web-socket-server-on-message-handlers.js";

export type WebSocketMessage = {
  data: unknown;
  type: keyof typeof webSocketServerOnMessageHandlers;
};
