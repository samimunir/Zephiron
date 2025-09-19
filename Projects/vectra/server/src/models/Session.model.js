import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, required: true },
  refreshToken: { type: String, index: true, required: true },
  userAgent: String,
  ip: String,
  revokedAt: Date,
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

SessionSchema.index({ user: 1, refreshToken: 1 }, { unique: true });

export default mongoose.model("Session", SessionSchema);