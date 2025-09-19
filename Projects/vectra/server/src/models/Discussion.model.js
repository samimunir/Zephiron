import mongoose from "mongoose";

const DiscussionSchema = new mongoose.Schema({
  company: { type: String, trim: true, required: true, index: true },
  position: { type: String, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, trim: true, required: true },
  pinned: { type: Boolean, default: false }
}, { timestamps: true });

DiscussionSchema.index({ company: 1, position: 1 });

export default mongoose.model("Discussion", DiscussionSchema);