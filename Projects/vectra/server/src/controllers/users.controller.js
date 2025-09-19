import User from "../models/User.model.js";
import { ok } from "../utils/apiResponse.js";

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).lean();
  return ok(res, { user });
};

export const updateProfile = async (req, res) => {
  const updates = {
    name: req.body.name,
    avatarUrl: req.body.avatarUrl
  };
  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).lean();
  return ok(res, { user });
};