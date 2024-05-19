import type { WebSocketPlusSocketID } from "../web-socket-server/types/WebSocketPlusSocketID.js";
import type { WebSocketServerOnMessageHandlerParameter } from "../web-socket-server/types/WebSocketServerOnMessageHandlerParameter.js";

let fiftyFirstGame = 0;

export const webSocketServerOnMessageHandlers = {
  reset: ({ webSocketServer }: WebSocketServerOnMessageHandlerParameter) => {
    fiftyFirstGame = 0;

    webSocketServer.clients.forEach((socket: WebSocketPlusSocketID) => {
      socket.send(JSON.stringify({ type: "increment", value: fiftyFirstGame }));
    });
  },

  increment: ({
    // data,
    webSocket,
    webSocketServer,
  }: WebSocketServerOnMessageHandlerParameter) => {
    const { socketID } = webSocket;

    fiftyFirstGame += 1;

    if (fiftyFirstGame === 50) {
      webSocketServer.clients.forEach((socket: WebSocketPlusSocketID) => {
        if (socket.socketID !== socketID) {
          socket.send(JSON.stringify({ result: "you won", won: false }));
        }

        if (socket.socketID === socketID) {
          socket.send(JSON.stringify({ result: "you won", won: true }));
        }

        fiftyFirstGame = 0;
      });
    }

    webSocketServer.clients.forEach((socket) => {
      socket.send(JSON.stringify({ type: "increment", value: fiftyFirstGame }));
    });
  },

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
