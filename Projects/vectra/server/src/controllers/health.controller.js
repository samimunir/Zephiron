export const healthcheck = (_req, res) => {
  res.json({ service: "vectra-api", ok: true });
};