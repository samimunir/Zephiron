import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requirePlan } from "../middleware/requirePlan.js";
import { validate } from "../middleware/validate.js";
import { listCommentsSchema, createCommentSchema } from "../validators/comments.schema.js";
import { listComments, createComment } from "../controllers/comments.controller.js";
import { PLANS } from "../utils/constants.js";

const r = Router();
r.get("/", validate(listCommentsSchema), listComments);
r.post("/", requireAuth, requirePlan(PLANS.PRO), validate(createCommentSchema), createComment);
export default r;