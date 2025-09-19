import { Router } from "express";
import { healthcheck } from "../controllers/health.controller.js";

const router = Router();

router.get("/health", healthcheck);

// TODO: router.use("/auth", authRoutes);
// TODO: router.use("/jobs", jobRoutes);
// TODO: router.use("/billing", billingRoutes);

export default router;