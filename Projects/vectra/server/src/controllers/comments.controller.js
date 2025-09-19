// controllers/comments.controller.js
import Comment from "../models/Comment.model.js";

export const createComment = async (req, res) => {
  const doc = await Comment.create({
    discussion: req.body.discussionId,
    author: req.user._id,
    body: req.body.body
  });
  res.status(201).json(doc);
};

export const listComments = async (req, res) => {
  const { discussionId, page = 1, pageSize = 20 } = req.query;
  const [items, total] = await Promise.all([
    Comment.find({ discussion: discussionId }).sort("createdAt").skip((page - 1) * pageSize).limit(pageSize).lean(),
    Comment.countDocuments({ discussion: discussionId })
  ]);
  res.json({ items, total, page, pageSize });
};