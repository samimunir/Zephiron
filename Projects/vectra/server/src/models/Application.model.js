import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, required: true },

  jobTitle: { type: String, required: true, trim: true, index: true },
  company:  { type: String, required: true, trim: true, index: true },
  workType: { type: String, enum: ["remote", "in-person", "hybrid"], index: true },
  location: { type: String, trim: true },
  careerCategory: { type: String, trim: true },
  positionType: { type: String, trim: true }, // e.g., full-time, contract

  // salary: flexible
  salary: {
    amount: Number,
    currency: { type: String, default: "USD" },
    cadence: { type: String, enum: ["hourly", "yearly"] }
  },

  applicationUrl: String,
  description: String,
  skills: [String],
  notes: String,
  tags: [String],

  status: { 
    type: String,
    enum: ["applied", "interview", "offer", "rejected", "closed"],
    default: "applied",
    index: true
  },

  // Timeline of key events for analytics
  history: [{
    at: { type: Date, default: Date.now },
    type: { type: String, enum: ["created", "status_changed", "note_added"] },
    payload: mongoose.Schema.Types.Mixed
  }],

}, { timestamps: true });

ApplicationSchema.index({ user: 1, createdAt: -1 });
ApplicationSchema.index({ user: 1, status: 1 });
ApplicationSchema.index({ user: 1, company: 1 });

export default mongoose.model("Application", ApplicationSchema);