import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import { createWebSocketServerGlobalInstance } from "./lib/runes/server/web-socket-server/create-web-socket-server-global-instance.js";
import { onHttpServerUpgrade } from "./lib/runes/server/web-socket-server/on-http-server-upgrade.js";

createWebSocketServerGlobalInstance();

const directory = dirname(fileURLToPath(import.meta.url));

const { server } = await import(resolve(directory, "../build/index.js"));

server.server.on("upgrade", onHttpServerUpgrade);
