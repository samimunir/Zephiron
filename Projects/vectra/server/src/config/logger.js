import pino from "pino";
import env from "./env.js";

const logger = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  transport: env.NODE_ENV === "production" ? undefined : { target: "pino-pretty" }
});

export default logger;