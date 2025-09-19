import { PLAN_RANK } from "../utils/constants.js";

export function requirePlan(minPlan) {
  return (req, res, next) => {
    const userPlan = req.user?.plan ?? "free";
    if (PLAN_RANK[userPlan] >= PLAN_RANK[minPlan]) return next();
    return res.status(402).json({ message: `Upgrade to ${minPlan} to access this feature.` });
  };
}