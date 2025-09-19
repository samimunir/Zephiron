import Discussion from "../models/Discussion.model.js";
import { ok, created } from "../utils/apiResponse.js";

// export const listDiscussions = async (req, res) => {
//   const { company, page = 1, pageSize = 20 } = req.query;
//   const filter = {};
//   if (company) filter.company = new RegExp(company, "i");
//   const [items, total] = await Promise.all([
//     Discussion.find(filter).sort("-createdAt").skip((page - 1) * pageSize).limit(pageSize).lean(),
//     Discussion.countDocuments(filter)
//   ]);
//   return ok(res, { items, total, page, pageSize });
// };

export const listDiscussions = async (req, res) => {
  const qsrc = res.locals?.query || req.query;
  const { company, page = 1, pageSize = 20 } = qsrc;

  const filter = {};
  if (company) filter.company = new RegExp(company, "i");

  const [items, total] = await Promise.all([
    Discussion.find(filter)
      .sort("-createdAt")
      .skip((Number(page) - 1) * Number(pageSize))
      .limit(Number(pageSize))
      .lean(),
    Discussion.countDocuments(filter),
  ]);

  return ok(res, {
    items,
    total,
    page: Number(page),
    pageSize: Number(pageSize),
  });
};

export const createDiscussion = async (req, res) => {
  const doc = await Discussion.create({
    company: req.body.company,
    position: req.body.position,
    title: req.body.title,
    createdBy: req.user._id,
  });
  return created(res, doc);
};
