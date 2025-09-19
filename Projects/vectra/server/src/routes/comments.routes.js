// routes/comments.routes.js
import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requirePlan } from "../middleware/requirePlan.js";
import { PLANS } from "../utils/constants.js";
import { createComment, listComments } from "../controllers/comments.controller.js";

const r = Router();
r.get("/", listComments);
r.post("/", requireAuth, requirePlan(PLANS.PRO), createComment);
export default r;