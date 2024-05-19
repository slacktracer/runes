import { isWebsocketMessage } from "../web-socket-server/is-websocket-message.js";
import type { WebSocketServerHandlers } from "../web-socket-server/types/WebSockerServerHandlers.js";
import { webSocketServerOnMessageHandlers } from "./web-socket-server-on-message-handlers.js";

export const webSocketServerHandlers: WebSocketServerHandlers = {
  onMessage: ({ rawData, webSocket, webSocketServer }) => {
    let rawDataAsString;

    if (rawData instanceof Buffer) {
      rawDataAsString = rawData.toString();
    }

    if (typeof rawDataAsString === "string") {
      const data = JSON.parse(rawDataAsString);

      if (isWebsocketMessage(data)) {
        webSocketServerOnMessageHandlers[data.type]({
          data,
          webSocket,
          webSocketServer,
        });
      }
    }
  },
};
