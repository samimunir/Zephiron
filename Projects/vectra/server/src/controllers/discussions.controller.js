// controllers/discussions.controller.js
import Discussion from "../models/Discussion.model.js";

export const createDiscussion = async (req, res) => {
  const doc = await Discussion.create({
    company: req.body.company,
    position: req.body.position,
    title: req.body.title,
    createdBy: req.user._id
  });
  res.status(201).json(doc);
};

export const listDiscussions = async (req, res) => {
  const { company, page = 1, pageSize = 20 } = req.query;
  const filter = {};
  if (company) filter.company = new RegExp(company, "i");
  const [items, total] = await Promise.all([
    Discussion.find(filter).sort("-createdAt").skip((page - 1) * pageSize).limit(pageSize).lean(),
    Discussion.countDocuments(filter)
  ]);
  res.json({ items, total, page, pageSize });
};