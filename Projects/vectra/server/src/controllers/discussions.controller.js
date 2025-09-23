import mongoose from "mongoose";
import Discussion from "../models/Discussion.model.js";
import DiscussionMessage from "../models/DiscussionMessage.model.js";

export async function createThread(req, res) {
  const { title, tags = [], applicationId } = req.body;
  const doc = await Discussion.create({
    title: title.trim(),
    tags,
    applicationId: applicationId
      ? new mongoose.Types.ObjectId(applicationId)
      : null,
    createdBy: req.user._id,
    messageCount: 0,
    lastMessageAt: new Date(),
    participants: [req.user._id],
  });
  return res.status(201).json({ thread: doc });
}

export async function listThreads(req, res) {
  const { q, tag, applicationId, page = 1, limit = 20, mine } = req.query;

  const filter = {};
  if (q) filter.$text = { $search: q };
  if (tag) filter.tags = tag;
  if (applicationId)
    filter.applicationId = new mongoose.Types.ObjectId(applicationId);
  if (mine === "1") filter.createdBy = req.user._id;

  const [items, total] = await Promise.all([
    Discussion.find(filter)
      .sort({ lastMessageAt: -1, _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("createdBy", "name avatarUrl")
      .lean(),
    Discussion.countDocuments(filter),
  ]);

  return res.json({
    page,
    limit,
    total,
    items,
  });
}

export async function getThread(req, res) {
  const { id } = req.params;
  const thread = await Discussion.findById(id)
    .populate("createdBy", "name avatarUrl")
    .lean();
  if (!thread) return res.status(404).json({ message: "Thread not found" });
  return res.json({ thread });
}

export async function updateThread(req, res) {
  const { id } = req.params;
  const thread = await Discussion.findById(id);
  if (!thread) return res.status(404).json({ message: "Thread not found" });

  // Owner-only (add admin role check if you have roles)
  if (thread.createdBy.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Only the thread owner can update it." });
  }

  const { title, tags, pinned, locked } = req.body;
  if (title !== undefined) thread.title = title.trim();
  if (tags !== undefined) thread.tags = tags;
  if (pinned !== undefined) thread.pinned = !!pinned;
  if (locked !== undefined) thread.locked = !!locked;

  await thread.save();
  return res.json({ thread });
}

export async function deleteThread(req, res) {
  const { id } = req.params;
  const thread = await Discussion.findById(id);
  if (!thread) return res.status(404).json({ message: "Thread not found" });

  if (thread.createdBy.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Only the thread owner can delete it." });
  }

  await DiscussionMessage.deleteMany({ threadId: thread._id });
  await Discussion.deleteOne({ _id: thread._id });

  return res.json({ ok: true });
}
