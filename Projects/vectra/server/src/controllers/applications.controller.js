import Application from "../models/Application.model.js";
import { ok, created, noContent } from "../utils/apiResponse.js";

export const createApplication = async (req, res) => {
  const doc = await Application.create({
    ...req.body,
    user: req.user._id,
    history: [{ type: "created", payload: {} }],
  });
  return created(res, doc);
};

// export const listApplications = async (req, res) => {
//   const { page = 1, pageSize = 20, sort = "-createdAt", status, company, q } = req.query;
//   const filter = { user: req.user._id };
//   if (status) filter.status = status;
//   if (company) filter.company = new RegExp(`^${company}$`, "i");
//   if (q) filter.$or = [
//     { jobTitle: new RegExp(q, "i") },
//     { company: new RegExp(q, "i") },
//     { tags: new RegExp(q, "i") }
//   ];

//   const [items, total] = await Promise.all([
//     Application.find(filter).sort(sort).skip((page - 1) * pageSize).limit(pageSize).lean(),
//     Application.countDocuments(filter)
//   ]);
//   return ok(res, { items, page, pageSize, total, pages: Math.ceil(total / pageSize) });
// };

export const listApplications = async (req, res) => {
  // ✅ pick validated query if present
  const qsrc = res.locals?.query || req.query;
  const {
    page = 1,
    pageSize = 20,
    sort = "-createdAt",
    status,
    company,
    q,
  } = qsrc;

  const filter = { user: req.user._id };
  if (status) filter.status = status;
  if (company) filter.company = new RegExp(`^${company}$`, "i");
  if (q)
    filter.$or = [
      { jobTitle: new RegExp(q, "i") },
      { company: new RegExp(q, "i") },
      { tags: new RegExp(q, "i") },
    ];

  const [items, total] = await Promise.all([
    // page & pageSize may be strings when falling back; coerce just in case
    Application.find(filter)
      .sort(sort)
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
};

export const updateApplication = async (req, res) => {
  const before = await Application.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!before) return res.status(404).json({ message: "Not found" });

  const statusChanged = req.body.status && req.body.status !== before.status;
  Object.assign(before, req.body);
  if (statusChanged) {
    before.history.push({
      type: "status_changed",
      payload: { from: before.status, to: req.body.status },
    });
  }
  await before.save();
  return ok(res, before);
};

export const removeApplication = async (req, res) => {
  const deleted = await Application.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!deleted) return res.status(404).json({ message: "Not found" });
  return noContent(res);
};

export const statusCounts = async (req, res) => {
  const pipeline = [
    { $match: { user: req.user._id } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ];
  const rows = await (
    await import("../models/Application.model.js")
  ).default.aggregate(pipeline);
  const base = { applied: 0, interview: 0, offer: 0, rejected: 0, closed: 0 };
  rows.forEach((r) => (base[r._id] = r.count));
  res.json(base);
};

export const createdPerDay = async (req, res) => {
  const { days = 30 } = req.query;
  const from = new Date(Date.now() - Number(days) * 24 * 60 * 60 * 1000);
  const pipeline = [
    { $match: { user: req.user._id, createdAt: { $gte: from } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ];
  const rows = await (
    await import("../models/Application.model.js")
  ).default.aggregate(pipeline);
  res.json(rows.map((r) => ({ date: r._id, count: r.count })));
};
