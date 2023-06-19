// src/Main.ts

import { Server } from "./infrastructure/server/Server";

const port = 3000;
const server = new Server(port);

server.start();
console.log(`Server listening on port ${port}`);