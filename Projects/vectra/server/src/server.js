import http from "http";
import app from "./app.js";
import env from "./config/env.js";
import logger from "./config/logger.js";
import { connectDB, disconnectDB } from "./config/db.js";

const server = http.createServer(app);

// Start sequence
(async () => {
  try {
    await connectDB();
    server.listen(env.PORT, () => {
      logger.info(`🚀 Vectra API listening at http://localhost:${env.PORT}`);
    });
  } catch (err) {
    logger.error({ err }, "Failed to start server");
    process.exit(1);
  }
})();

// Graceful shutdown
const shutdown = async (signal) => {
  logger.info(`${signal} received, shutting down…`);
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
};
["SIGINT", "SIGTERM"].forEach((sig) => process.on(sig, () => shutdown(sig)));