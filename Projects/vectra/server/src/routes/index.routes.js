import { Router } from "express";
import auth from "./auth.routes.js";
import users from "./users.routes.js";
import applications from "./applications.routes.js";
import discussions from "./discussions.routes.js";
import comments from "./comments.routes.js";
import billing from "./billing.routes.js";

const router = Router();
router.use("/auth", auth);
router.use("/users", users);
router.use("/applications", applications);
router.use("/discussions", discussions);
router.use("/comments", comments);
router.use("/billing", billing);

export default router;