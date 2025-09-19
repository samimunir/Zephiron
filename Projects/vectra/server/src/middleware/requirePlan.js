import { PLANS } from "../utils/constants.js";

const rank = { [PLANS.FREE]: 0, [PLANS.BASIC]: 1, [PLANS.PRO]: 2 };

export function requirePlan(minPlan) {
  return (req, res, next) => {
    const userPlan = req.user?.plan || PLANS.FREE;
    if (rank[userPlan] >= rank[minPlan]) return next();
    return res.status(402).json({ message: `Upgrade to ${minPlan} to access this feature.` });
  };
}