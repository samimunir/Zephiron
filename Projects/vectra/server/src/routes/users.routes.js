import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getProfile, updateProfile } from "../controllers/users.controller.js";

const r = Router();
r.use(requireAuth);
r.get("/me", getProfile);
r.patch("/me", updateProfile);
export default r;