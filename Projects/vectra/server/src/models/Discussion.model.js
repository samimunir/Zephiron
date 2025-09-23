import mongoose from "mongoose";

const DiscussionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 140,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      default: null,
    },
    tags: { type: [String], default: [] },
    messageCount: { type: Number, default: 0 },
    lastMessageAt: { type: Date, default: Date.now },
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    pinned: { type: Boolean, default: false },
    locked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

DiscussionSchema.index({ lastMessageAt: -1 });
DiscussionSchema.index({ createdBy: 1 });
DiscussionSchema.index({ applicationId: 1 });
DiscussionSchema.index({ title: "text" }, { default_language: "none" });

const Discussion = mongoose.model("Discussion", DiscussionSchema);
export default Discussion;
