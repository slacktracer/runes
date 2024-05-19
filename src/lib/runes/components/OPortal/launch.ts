import { connectToWebSocketServer } from "../../connect-to-web-socket-server.js";
import type { Rune } from "../../types/Rune.js";

export const launch = ({ rune }: { rune: Rune }) => {
  const webSocket = connectToWebSocketServer();

  webSocket?.send(
    JSON.stringify({
      data: { ...rune, state: undefined, stylus: undefined },
      type: "rune",
    }),
  );
};
