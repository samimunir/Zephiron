import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  discussion: { type: mongoose.Schema.Types.ObjectId, ref: "Discussion", index: true, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  body: { type: String, required: true, trim: true },
  reactions: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, type: String }]
}, { timestamps: true });

CommentSchema.index({ discussion: 1, createdAt: 1 });

export default mongoose.model("Comment", CommentSchema);