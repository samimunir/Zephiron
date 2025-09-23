import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      index: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true, select: false },
    name: { type: String, trim: true },
    avatarUrl: String,

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },

    plan: {
      type: String,
      enum: ["free", "basic", "pro"],
      default: "free",
      index: true,
    },
    subscriptionStatus: {
      type: String,
      enum: ["inactive", "active", "past_due", "canceled"],
      default: "inactive",
    },
    stripeCustomerId: String,
    stripeSubscriptionId: { type: String },
    currentPeriodEnd: Date,
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = async function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

export default mongoose.model("User", UserSchema);
