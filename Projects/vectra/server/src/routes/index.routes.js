// routes/index.routes.js
import { Router } from "express";
import applications from "./applications.routes.js";
import discussions from "./discussions.routes.js";
import comments from "./comments.routes.js";
// import auth from "./auth.routes.js"; import users from "./users.routes.js"; import billing from "./billing.routes.js";

const router = Router();
router.use("/applications", applications);
router.use("/discussions", discussions);
router.use("/comments", comments);
export default router;