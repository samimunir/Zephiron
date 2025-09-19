export const validate =
  (schema) =>
  (req, res, next) => {
    const data = { body: req.body, query: req.query, params: req.params };
    const result = schema.safeParse(data);
    if (!result.success) {
      return res.status(400).json({ message: "Validation error", issues: result.error.issues });
    }
    Object.assign(req, result.data); // normalized
    next();
  };