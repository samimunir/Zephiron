// import mongoose from "mongoose";

// const ApplicationSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, required: true },

//   jobTitle: { type: String, required: true, trim: true, index: true },
//   company:  { type: String, required: true, trim: true, index: true },
//   workType: { type: String, enum: ["remote", "in-person", "hybrid"], index: true },
//   location: { type: String, trim: true },
//   careerCategory: { type: String, trim: true },
//   positionType: { type: String, trim: true },

//   salary: {
//     amount: Number,
//     currency: { type: String, default: "USD" },
//     cadence: { type: String, enum: ["hourly", "yearly"] }
//   },

//   applicationUrl: String,
//   description: String,
//   skills: [String],
//   notes: String,
//   tags: [String],

//   status: {
//     type: String,
//     enum: ["applied", "interview", "offer", "rejected", "closed"],
//     default: "applied",
//     index: true
//   },

//   history: [{
//     at: { type: Date, default: Date.now },
//     type: { type: String, enum: ["created", "status_changed", "note_added"] },
//     payload: mongoose.Schema.Types.Mixed
//   }]
// }, { timestamps: true });

// ApplicationSchema.index({ user: 1, createdAt: -1 });
// ApplicationSchema.index({ user: 1, status: 1 });
// ApplicationSchema.index({ user: 1, company: 1 });

// export default mongoose.model("Application", ApplicationSchema);

// server/models/Application.model.js
import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: { type: String, required: true },
    jobTitle: { type: String, required: true },
    status: {
      type: String,
      enum: ["applied", "interview", "offer", "rejected", "closed"],
      default: "applied",
    },
    workType: {
      type: String,
      enum: ["remote", "in-person", "hybrid"],
      default: "remote",
    },

    // New structured location fields
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, required: true },

    // Job posting link
    postingUrl: { type: String },

    // Extra meta
    skills: [{ type: String }],
    tags: [{ type: String }],
    category: { type: String }, // e.g. "technology", "sales", "marketing"

    notes: { type: String },

    appliedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Application", ApplicationSchema);
