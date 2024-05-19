import type { WebSocketPlusSocketID } from "../web-socket-server/types/WebSocketPlusSocketID.js";
import type { WebSocketServerOnMessageHandlerParameter } from "../web-socket-server/types/WebSocketServerOnMessageHandlerParameter.js";

export const webSocketServerOnMessageHandlers = {
  rune: ({
    data,
    webSocket,
    webSocketServer,
  }: WebSocketServerOnMessageHandlerParameter) => {
    webSocketServer.clients.forEach((socket: WebSocketPlusSocketID) => {
      webSocket.socketID !== socket.socketID &&
        socket.send(JSON.stringify({ data, type: "rune" }));
    });
  },
};
