export const PLANS = { FREE: "free", BASIC: "basic", PRO: "pro" };
export const PLAN_RANK = { [PLANS.FREE]: 0, [PLANS.BASIC]: 1, [PLANS.PRO]: 2 };

export const FEATURES = {
  COMMUNITY_POST: { minPlan: PLANS.PRO },
  APP_LIMIT: { free: 50, basic: 500, pro: 5000 }
};