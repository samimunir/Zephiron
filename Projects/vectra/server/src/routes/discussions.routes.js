import { Router } from "express";
import { validate } from "../middleware/validate.js"; // your existing validate middleware
import { requireAuth } from "../middleware/auth.js";
import requirePro from "../middleware/requirePro.js";

import {
  createThreadSchema,
  listThreadsSchema,
  getThreadSchema,
  updateThreadSchema,
  deleteThreadSchema,
} from "../validators/discussions.schema.js";

import {
  createThread,
  listThreads,
  getThread,
  updateThread,
  deleteThread,
} from "../controllers/discussions.controller.js";

const r = Router();

// Read: auth required (you can relax this to allow anonymous read if desired)
r.get("/", requireAuth, validate(listThreadsSchema), listThreads);
r.get("/:id", requireAuth, validate(getThreadSchema), getThread);

// Write: Pro required
r.post(
  "/",
  requireAuth,
  requirePro,
  validate(createThreadSchema),
  createThread
);
r.patch(
  "/:id",
  requireAuth,
  requirePro,
  validate(updateThreadSchema),
  updateThread
);
r.delete(
  "/:id",
  requireAuth,
  requirePro,
  validate(deleteThreadSchema),
  deleteThread
);

export default r;
