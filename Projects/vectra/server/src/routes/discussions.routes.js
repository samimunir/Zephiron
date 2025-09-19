// routes/discussions.routes.js
import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requirePlan } from "../middleware/requirePlan.js";
import { PLANS } from "../utils/constants.js";
import { createDiscussion, listDiscussions } from "../controllers/discussions.controller.js";

const r = Router();
r.get("/", listDiscussions);
r.post("/", requireAuth, requirePlan(PLANS.PRO), createDiscussion);
export default r;