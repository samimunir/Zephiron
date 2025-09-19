// export const validate = (schema) => (req, res, next) => {
//   const data = { body: req.body, query: req.query, params: req.params };
//   const result = schema.safeParse(data);
//   if (!result.success) {
//     return res.status(400).json({ message: "Validation error", issues: result.error.issues });
//   }
//   Object.assign(req, result.data);
//   next();
// };

export const validate = (schema) => (req, res, next) => {
  const input = { body: req.body, query: req.query, params: req.params };
  const result = schema.safeParse(input);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation error",
      issues: result.error.issues,
    });
  }

  // Safe assignments (no write to req.query!)
  req.body = result.data.body;
  req.params = result.data.params;

  // Expose the coerced/validated query without touching req.query
  res.locals.query = result.data.query;

  next();
};
