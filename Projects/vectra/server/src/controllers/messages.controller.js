import Discussion from "../models/Discussion.model.js";
import DiscussionMessage from "../models/DiscussionMessage.model.js";

export async function listMessages(req, res) {
  const { id } = req.params;
  const { cursor, limit = 30 } = req.query;

  const thread = await Discussion.findById(id).lean();
  if (!thread) return res.status(404).json({ message: "Thread not found" });

  const find = { threadId: thread._id, deletedAt: null };
  if (cursor) {
    // forward pagination (oldest -> newest), skip messages up to cursor
    find._id = { $gt: cursor };
  }

  const items = await DiscussionMessage.find(find)
    .sort({ _id: 1 }) // oldest first
    .limit(limit)
    .populate("authorId", "name avatarUrl")
    .lean();

  const nextCursor =
    items.length === Number(limit) ? String(items[items.length - 1]._id) : null;

  return res.json({ items, nextCursor });
}

export async function createMessage(req, res) {
  const { id } = req.params;
  const { body } = req.body;

  const thread = await Discussion.findById(id);
  if (!thread) return res.status(404).json({ message: "Thread not found" });
  if (thread.locked)
    return res.status(403).json({ message: "Thread is locked." });

  const msg = await DiscussionMessage.create({
    threadId: thread._id,
    authorId: req.user._id,
    body: body.trim(),
  });

  // Update thread counters
  thread.messageCount += 1;
  thread.lastMessageAt = new Date();
  // Track participants (dedupe)
  if (!thread.participants.map(String).includes(String(req.user._id))) {
    thread.participants.push(req.user._id);
  }
  await thread.save();

  const populated = await msg.populate("authorId", "name avatarUrl");
  return res.status(201).json({ message: populated });
}

export async function editMessage(req, res) {
  const { messageId } = req.params;
  const { body } = req.body;

  const msg = await DiscussionMessage.findById(messageId);
  if (!msg) return res.status(404).json({ message: "Message not found" });

  if (String(msg.authorId) !== String(req.user._id)) {
    return res
      .status(403)
      .json({ message: "You can only edit your own message." });
  }

  msg.body = body.trim();
  msg.editedAt = new Date();
  await msg.save();

  const populated = await msg.populate("authorId", "name avatarUrl");
  return res.json({ message: populated });
}

export async function deleteMessage(req, res) {
  const { messageId } = req.params;

  const msg = await DiscussionMessage.findById(messageId);
  if (!msg) return res.status(404).json({ message: "Message not found" });

  if (String(msg.authorId) !== String(req.user._id)) {
    return res
      .status(403)
      .json({ message: "You can only delete your own message." });
  }

  msg.deletedAt = new Date();
  await msg.save();

  return res.json({ ok: true });
}
