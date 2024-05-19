import type { PreviewServer, ViteDevServer } from "vite";

import { createWebSocketServerGlobalInstance } from "./create-web-socket-server-global-instance.js";
import { onHttpServerUpgrade } from "./on-http-server-upgrade.js";

export const webSocketServerVitePlugin = {
  configureServer(server: ViteDevServer) {
    createWebSocketServerGlobalInstance();

    server.httpServer?.on("upgrade", onHttpServerUpgrade);
  },

  configurePreviewServer(server: PreviewServer) {
    createWebSocketServerGlobalInstance();

    server.httpServer?.on("upgrade", onHttpServerUpgrade);
  },

  name: "webSocketServer",
};
