// import Application from "../models/Application.model.js";
// import { ok, created, noContent } from "../utils/apiResponse.js";

// export const createApplication = async (req, res) => {
//   const doc = await Application.create({
//     ...req.body,
//     user: req.user._id,
//     history: [{ type: "created", payload: {} }],
//   });
//   return created(res, doc);
// };

// // export const listApplications = async (req, res) => {
// //   const { page = 1, pageSize = 20, sort = "-createdAt", status, company, q } = req.query;
// //   const filter = { user: req.user._id };
// //   if (status) filter.status = status;
// //   if (company) filter.company = new RegExp(`^${company}$`, "i");
// //   if (q) filter.$or = [
// //     { jobTitle: new RegExp(q, "i") },
// //     { company: new RegExp(q, "i") },
// //     { tags: new RegExp(q, "i") }
// //   ];

// //   const [items, total] = await Promise.all([
// //     Application.find(filter).sort(sort).skip((page - 1) * pageSize).limit(pageSize).lean(),
// //     Application.countDocuments(filter)
// //   ]);
// //   return ok(res, { items, page, pageSize, total, pages: Math.ceil(total / pageSize) });
// // };

// export const listApplications = async (req, res) => {
//   // ✅ pick validated query if present
//   const qsrc = res.locals?.query || req.query;
//   const {
//     page = 1,
//     pageSize = 20,
//     sort = "-createdAt",
//     status,
//     company,
//     q,
//   } = qsrc;

//   const filter = { user: req.user._id };
//   if (status) filter.status = status;
//   if (company) filter.company = new RegExp(`^${company}$`, "i");
//   if (q)
//     filter.$or = [
//       { jobTitle: new RegExp(q, "i") },
//       { company: new RegExp(q, "i") },
//       { tags: new RegExp(q, "i") },
//     ];

//   const [items, total] = await Promise.all([
//     // page & pageSize may be strings when falling back; coerce just in case
//     Application.find(filter)
//       .sort(sort)
//       .skip((Number(page) - 1) * Number(pageSize))
//       .limit(Number(pageSize))
//       .lean(),
//     Application.countDocuments(filter),
//   ]);

//   return ok(res, {
//     items,
//     page: Number(page),
//     pageSize: Number(pageSize),
//     total,
//     pages: Math.ceil(total / Number(pageSize)),
//   });
// };

// export const updateApplication = async (req, res) => {
//   const before = await Application.findOne({
//     _id: req.params.id,
//     user: req.user._id,
//   });
//   if (!before) return res.status(404).json({ message: "Not found" });

//   const statusChanged = req.body.status && req.body.status !== before.status;
//   Object.assign(before, req.body);
//   if (statusChanged) {
//     before.history.push({
//       type: "status_changed",
//       payload: { from: before.status, to: req.body.status },
//     });
//   }
//   await before.save();
//   return ok(res, before);
// };

// export const removeApplication = async (req, res) => {
//   const deleted = await Application.findOneAndDelete({
//     _id: req.params.id,
//     user: req.user._id,
//   });
//   if (!deleted) return res.status(404).json({ message: "Not found" });
//   return noContent(res);
// };

// export const statusCounts = async (req, res) => {
//   const pipeline = [
//     { $match: { user: req.user._id } },
//     { $group: { _id: "$status", count: { $sum: 1 } } },
//   ];
//   const rows = await (
//     await import("../models/Application.model.js")
//   ).default.aggregate(pipeline);
//   const base = { applied: 0, interview: 0, offer: 0, rejected: 0, closed: 0 };
//   rows.forEach((r) => (base[r._id] = r.count));
//   res.json(base);
// };

// export const createdPerDay = async (req, res) => {
//   const { days = 30 } = req.query;
//   const from = new Date(Date.now() - Number(days) * 24 * 60 * 60 * 1000);
//   const pipeline = [
//     { $match: { user: req.user._id, createdAt: { $gte: from } } },
//     {
//       $group: {
//         _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
//         count: { $sum: 1 },
//       },
//     },
//     { $sort: { _id: 1 } },
//   ];
//   const rows = await (
//     await import("../models/Application.model.js")
//   ).default.aggregate(pipeline);
//   res.json(rows.map((r) => ({ date: r._id, count: r.count })));
// };

// server/controllers/applications.controller.js
import Application from "../models/Application.model.js";
import { ok, created, noContent } from "../utils/apiResponse.js";

/**
 * Only allow these fields from the client
 */
const ALLOWED_FIELDS = [
  "company",
  "jobTitle",
  "status",
  "workType",
  "city",
  "state",
  "country",
  "postingUrl",
  "skills",
  "tags",
  "category",
  "notes",
  "appliedAt",
];

const pickAllowed = (src = {}) => {
  const out = {};
  for (const k of ALLOWED_FIELDS) {
    if (src[k] !== undefined) out[k] = src[k];
  }
  return out;
};

/**
 * POST /api/v1/applications
 * Create one application; attach userId from req.user
 */
export const createApplication = async (req, res, next) => {
  try {
    if (!req.user?._id)
      return res.status(401).json({ message: "Unauthorized" });

    const data = pickAllowed(req.body);
    data.userId = req.user._id; // 🔑 required by the model

    const doc = await Application.create({
      ...data,
      history: [{ type: "created", payload: {} }],
    });

    return created(res, doc);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /api/v1/applications
 * List current user's applications with filters/pagination
 */
export const listApplications = async (req, res, next) => {
  try {
    if (!req.user?._id)
      return res.status(401).json({ message: "Unauthorized" });

    const qsrc = res.locals?.query || req.query;
    const {
      page = 1,
      pageSize = 20,
      sort = "-createdAt",
      status,
      company,
      q,
    } = qsrc;

    const filter = { userId: req.user._id }; // 🔑 scope by user

    if (status) filter.status = status;
    if (company) filter.company = new RegExp(`^${company}$`, "i");
    if (q) {
      filter.$or = [
        { jobTitle: new RegExp(q, "i") },
        { company: new RegExp(q, "i") },
        { city: new RegExp(q, "i") },
        { country: new RegExp(q, "i") },
        { tags: new RegExp(q, "i") },
        { skills: new RegExp(q, "i") },
      ];
    }

    // sort can be like: "-createdAt,company"
    const sortSpec =
      typeof sort === "string"
        ? sort.split(",").reduce((acc, token) => {
            const dir = token.startsWith("-") ? -1 : 1;
            const key = token.replace(/^-/, "");
            if (key) acc[key] = dir;
            return acc;
          }, {})
        : { createdAt: -1 };

    const [items, total] = await Promise.all([
      Application.find(filter)
        .sort(sortSpec)
        .skip((Number(page) - 1) * Number(pageSize))
        .limit(Number(pageSize))
        .lean(),
      Application.countDocuments(filter),
    ]);

    return ok(res, {
      items,
      page: Number(page),
      pageSize: Number(pageSize),
      total,
      pages: Math.ceil(total / Number(pageSize)),
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /api/v1/applications/:id
 * Read one (scoped to user)
 */
export const getApplication = async (req, res, next) => {
  try {
    if (!req.user?._id)
      return res.status(401).json({ message: "Unauthorized" });

    const item = await Application.findOne({
      _id: req.params.id,
      userId: req.user._id, // 🔑
    }).lean();

    if (!item) return res.status(404).json({ message: "Not found" });
    return ok(res, item);
  } catch (err) {
    return next(err);
  }
};

/**
 * PATCH /api/v1/applications/:id
 * Update one (scoped to user); maintain history when status changes
 */
export const updateApplication = async (req, res, next) => {
  try {
    if (!req.user?._id)
      return res.status(401).json({ message: "Unauthorized" });

    const before = await Application.findOne({
      _id: req.params.id,
      userId: req.user._id, // 🔑
    });
    if (!before) return res.status(404).json({ message: "Not found" });

    const prevStatus = before.status;
    const data = pickAllowed(req.body);

    const statusChanged = data.status && data.status !== prevStatus;

    Object.assign(before, data);

    if (statusChanged) {
      before.history.push({
        type: "status_changed",
        payload: { from: prevStatus, to: data.status },
      });
    }

    await before.save();
    return ok(res, before);
  } catch (err) {
    return next(err);
  }
};

/**
 * DELETE /api/v1/applications/:id
 * Remove one (scoped to user)
 */
export const removeApplication = async (req, res, next) => {
  try {
    if (!req.user?._id)
      return res.status(401).json({ message: "Unauthorized" });

    const deleted = await Application.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id, // 🔑
    });

    if (!deleted) return res.status(404).json({ message: "Not found" });
    return noContent(res);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /api/v1/applications/stats/status-counts
 * Returns counts per status for current user
 */
export const statusCounts = async (req, res, next) => {
  try {
    if (!req.user?._id)
      return res.status(401).json({ message: "Unauthorized" });

    const rows = await Application.aggregate([
      { $match: { userId: req.user._id } }, // 🔑
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const base = { applied: 0, interview: 0, offer: 0, rejected: 0, closed: 0 };
    rows.forEach((r) => (base[r._id] = r.count));

    return ok(res, base);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /api/v1/applications/stats/created-per-day?days=30
 * Returns [{date,count}] for the last N days for current user
 */
export const createdPerDay = async (req, res, next) => {
  try {
    if (!req.user?._id)
      return res.status(401).json({ message: "Unauthorized" });

    const days = Number(req.query.days || 30);
    const from = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const rows = await Application.aggregate([
      { $match: { userId: req.user._id, createdAt: { $gte: from } } }, // 🔑
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return ok(
      res,
      rows.map((r) => ({ date: r._id, count: r.count }))
    );
  } catch (err) {
    return next(err);
  }
};
