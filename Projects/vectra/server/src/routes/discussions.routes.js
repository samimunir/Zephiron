import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requirePlan } from "../middleware/requirePlan.js";
import { validate } from "../middleware/validate.js";
import { createDiscussionSchema, listDiscussionsSchema } from "../validators/discussions.schema.js";
import { createDiscussion, listDiscussions } from "../controllers/discussions.controller.js";
import { PLANS } from "../utils/constants.js";

const r = Router();
r.get("/", validate(listDiscussionsSchema), listDiscussions);
r.post("/", requireAuth, requirePlan(PLANS.PRO), validate(createDiscussionSchema), createDiscussion);
export default r;