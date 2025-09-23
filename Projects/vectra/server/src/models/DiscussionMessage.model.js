import mongoose from "mongoose";

const DiscussionMessageSchema = new mongoose.Schema(
  {
    threadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion",
      required: true,
      index: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    body: { type: String, required: true, minlength: 1, maxlength: 4000 },
    editedAt: { type: Date, default: null },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

DiscussionMessageSchema.index({ threadId: 1, createdAt: 1 });

const DiscussionMessage = mongoose.model(
  "DiscussionMessage",
  DiscussionMessageSchema
);
export default DiscussionMessage;
