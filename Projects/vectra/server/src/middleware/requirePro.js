export default function requirePro(req, res, next) {
  const u = req.user;
  const ok =
    u &&
    u.plan === "pro" &&
    ["active", "trialing"].includes(u.subscriptionStatus || "");
  if (!ok)
    return res.status(403).json({ message: "Posting requires a Pro plan." });
  next();
}
