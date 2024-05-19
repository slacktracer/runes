import { webSocketServerOnMessageHandlers } from "../core/web-socket-server-on-message-handlers.js";
import type { WebSocketMessage } from "./types/WebSocketMessage.js";

export const isWebsocketMessage = (
  argument: unknown,
): argument is WebSocketMessage => {
  if (
    argument &&
    typeof argument === "object" &&
    "type" in argument &&
    typeof argument.type === "string" &&
    argument.type in webSocketServerOnMessageHandlers
  ) {
    return true;
  }

  return false;
};
