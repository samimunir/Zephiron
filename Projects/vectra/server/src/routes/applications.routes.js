import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  createApplicationSchema,
  listApplicationsSchema,
  updateApplicationSchema,
  removeApplicationSchema
} from "../validators/applications.schema.js";
import {
  createApplication,
  listApplications,
  updateApplication,
  removeApplication,
  statusCounts,
  createdPerDay
} from "../controllers/applications.controller.js";

const r = Router();
r.use(requireAuth);
r.post("/", validate(createApplicationSchema), createApplication);
r.get("/", validate(listApplicationsSchema), listApplications);
r.patch("/:id", validate(updateApplicationSchema), updateApplication);
r.delete("/:id", validate(removeApplicationSchema), removeApplication);
r.get("/stats/status-counts", statusCounts);
r.get("/stats/created-per-day", createdPerDay);
export default r;