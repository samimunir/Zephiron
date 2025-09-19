import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { createCheckoutSession, createPortalSession } from "../controllers/billing.controller.js";

const r = Router();
r.use(requireAuth);
r.post("/checkout-session", createCheckoutSession);
r.post("/portal", createPortalSession);
export default r;