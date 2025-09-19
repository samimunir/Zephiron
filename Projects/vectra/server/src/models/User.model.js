import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, index: true, required: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  name: { type: String, trim: true },
  avatarUrl: String,

  // Authorization
  role: { type: String, enum: ["user", "admin"], default: "user", index: true },

  // Subscription / Billing
  plan: { type: String, enum: ["free", "basic", "pro"], default: "free", index: true },
  subscriptionStatus: { type: String, enum: ["inactive", "active", "past_due", "canceled"], default: "inactive" },
  stripeCustomerId: String,
  currentPeriodEnd: Date,

}, { timestamps: true });

UserSchema.methods.comparePassword = async function (plain) {
  const hash = this.passwordHash;
  return bcrypt.compare(plain, hash);
};

export default mongoose.model("User", UserSchema);