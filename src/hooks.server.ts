import type { Handle } from "@sveltejs/kit";

import { webSocketServerHandlers } from "./lib/tiles/server/core/web-socket-server-handlers.js";
import { startWebSocketServer } from "./lib/tiles/server/web-socket-server/start-web-socket-server.js";

export const handle = (async ({ event, resolve }) => {
  startWebSocketServer({ webSocketServerHandlers });

  const response = await resolve(event, {
    filterSerializedResponseHeaders: (name) => name === "content-type",
  });

  return response;
}) satisfies Handle;
