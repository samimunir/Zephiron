export const PLANS = {
  FREE: "free",
  BASIC: "basic",
  PRO: "pro",
};

export const FEATURES = {
  COMMUNITY_POST: { minPlan: PLANS.PRO },    // post comments/threads
  APP_LIMIT: { free: 50, basic: 500, pro: 5000 }
};