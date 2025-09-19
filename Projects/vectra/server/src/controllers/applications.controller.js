// controllers/applications.controller.js
import Application from "../models/Application.model.js";

export const createApplication = async (req, res) => {
  const doc = await Application.create({
    ...req.body,
    user: req.user._id,
    history: [{ type: "created", payload: {} }]
  });
  res.status(201).json(doc);
};

export const listApplications = async (req, res) => {
  const { page = 1, pageSize = 20, sort = "-createdAt", status, company, q } = req.query;
  const filter = { user: req.user._id };
  if (status) filter.status = status;
  if (company) filter.company = new RegExp(`^${company}$`, "i");
  if (q) filter.$or = [
    { jobTitle: new RegExp(q, "i") },
    { company: new RegExp(q, "i") },
    { tags: new RegExp(q, "i") }
  ];

  const [items, total] = await Promise.all([
    Application.find(filter).sort(sort).skip((page - 1) * pageSize).limit(pageSize).lean(),
    Application.countDocuments(filter)
  ]);

  res.json({ items, page, pageSize, total, pages: Math.ceil(total / pageSize) });
};

export const updateApplication = async (req, res) => {
  const before = await Application.findOne({ _id: req.params.id, user: req.user._id });
  if (!before) return res.status(404).json({ message: "Not found" });

  const statusChanged = req.body.status && req.body.status !== before.status;
  Object.assign(before, req.body);
  if (statusChanged) {
    before.history.push({ type: "status_changed", payload: { from: before.status, to: req.body.status } });
  }
  await before.save();
  res.json(before);
};

export const removeApplication = async (req, res) => {
  const deleted = await Application.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.status(204).end();
};