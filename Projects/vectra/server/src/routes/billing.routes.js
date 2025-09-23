import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  cancelSubscription,
  createCheckoutSession,
  createPortalSession,
} from "../controllers/billing.controller.js";

const r = Router();
r.use(requireAuth);
r.post("/checkout-session", createCheckoutSession);
r.post("/portal", createPortalSession);
r.post("/cancel", cancelSubscription);
export default r;
