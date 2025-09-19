import Comment from "../models/Comment.model.js";
import { ok, created } from "../utils/apiResponse.js";

// export const listComments = async (req, res) => {
//   const { discussionId, page = 1, pageSize = 20 } = req.query;
//   const [items, total] = await Promise.all([
//     Comment.find({ discussion: discussionId }).sort("createdAt").skip((page - 1) * pageSize).limit(pageSize).lean(),
//     Comment.countDocuments({ discussion: discussionId })
//   ]);
//   return ok(res, { items, total, page, pageSize });
// };

export const listComments = async (req, res) => {
  const qsrc = res.locals?.query || req.query;
  const { discussionId, page = 1, pageSize = 20 } = qsrc;

  const [items, total] = await Promise.all([
    Comment.find({ discussion: discussionId })
      .sort("createdAt")
      .skip((Number(page) - 1) * Number(pageSize))
      .limit(Number(pageSize))
      .lean(),
    Comment.countDocuments({ discussion: discussionId }),
  ]);

  return ok(res, {
    items,
    total,
    page: Number(page),
    pageSize: Number(pageSize),
  });
};

export const createComment = async (req, res) => {
  const doc = await Comment.create({
    discussion: req.body.discussionId,
    author: req.user._id,
    body: req.body.body,
  });
  return created(res, doc);
};
