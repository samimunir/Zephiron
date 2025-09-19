import express from "express";
import cors from "cors";
import helmet from "helmet";
import { apiLimiter } from "./middleware/rateLimit.js";
import routes from "./routes/index.routes.js";
import webhookRoutes from "./routes/webhooks.routes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import env from "./config/env.js";
import { isDBReady } from "./config/db.js";

const app = express();

// Security & basics
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({
  origin: [env.ALLOWED_ORIGIN],
  credentials: true
}));

// Webhook raw body (Stripe) BEFORE json parsing
app.post("/webhooks/stripe", express.raw({ type: "application/json" }), webhookRoutes);

// JSON parser for all other routes
app.use(express.json({ limit: "100kb" }));

// Global rate limiter
app.use(apiLimiter);

// Health endpoints
app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/readiness", (_req, res) => res.status(isDBReady() ? 200 : 503).json({ db: isDBReady() }));

// API routes
app.use("/api/v1", routes);

// 404 + error handling
app.use(notFound);
app.use(errorHandler);

export default app;