export function notFound(req, res, next) {
  const err = new Error(`Not Found - ${req.originalUrl}`);
  err.status = 404;
  next(err);
}

export function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  const payload = {
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
  };
  res.status(status).json(payload);
}