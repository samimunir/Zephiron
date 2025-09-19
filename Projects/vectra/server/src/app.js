 
import express from "express";
import cors from "cors";
import routes from "./routes/index.routes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

// Basic health endpoint
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// API routes
app.use("/api/v1", routes);

// 404 + error handling
app.use(notFound);
app.use(errorHandler);

export default app;