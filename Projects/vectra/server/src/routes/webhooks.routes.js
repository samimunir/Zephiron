import { Router } from "express";
import { stripeWebhook } from "../controllers/webhooks.controller.js";

const r = Router();
// NOTE: express.raw middleware is applied in app.js only for this path
r.post("/", stripeWebhook);
export default r;