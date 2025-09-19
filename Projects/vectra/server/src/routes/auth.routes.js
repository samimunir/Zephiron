import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema, refreshSchema, logoutSchema } from "../validators/auth.schema.js";
import { register, login, refresh, logout, me, logoutAll } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();
r.post("/register", validate(registerSchema), register);
r.post("/login", validate(loginSchema), login);
r.post("/refresh", validate(refreshSchema), refresh);
r.post("/logout", validate(logoutSchema), logout);
r.post("/logout-all", requireAuth, logoutAll);
r.get("/me", requireAuth, me);
export default r;