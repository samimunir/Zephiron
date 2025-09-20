import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.model.js";
import Session from "../models/Session.model.js";
import { signAccess, signRefresh, verifyRefresh } from "../utils/jwt.js";
import { created, ok, noContent } from "../utils/apiResponse.js";

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already in use" });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ email, passwordHash, name, plan: "free" });

  const jti = crypto.randomUUID();
  const refreshToken = signRefresh(user._id.toString(), jti);
  await Session.create({
    user: user._id,
    refreshToken,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  });
  const accessToken = signAccess(user._id.toString());

  return created(res, {
    user: { id: user._id, email: user.email, name: user.name, plan: user.plan },
    accessToken,
    refreshToken,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const jti = crypto.randomUUID();
  const refreshToken = signRefresh(user._id.toString(), jti);
  await Session.create({
    user: user._id,
    refreshToken,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  });
  const accessToken = signAccess(user._id.toString());

  return ok(res, {
    user: { id: user._id, email: user.email, name: user.name, plan: user.plan },
    accessToken,
    refreshToken,
  });
};

export const refresh = async (req, res) => {
  const { token } = req.body;
  try {
    const payload = verifyRefresh(token);
    const session = await Session.findOne({
      refreshToken: token,
      user: payload.sub,
      revokedAt: { $exists: false },
    });
    if (!session) return res.status(401).json({ message: "Invalid session" });

    await Session.deleteOne({ _id: session._id }); // rotate
    const accessToken = signAccess(payload.sub);
    const jti = crypto.randomUUID();
    const newRefresh = signRefresh(payload.sub, jti);
    await Session.create({
      user: payload.sub,
      refreshToken: newRefresh,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });
    return ok(res, { accessToken, refreshToken: newRefresh });
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const logout = async (req, res) => {
  const { token } = req.body;
  await Session.updateOne(
    { refreshToken: token },
    { $set: { revokedAt: new Date() } }
  );
  return noContent(res);
};

export const logoutAll = async (req, res) => {
  await Session.updateMany(
    { user: req.user._id, revokedAt: { $exists: false } },
    { $set: { revokedAt: new Date() } }
  );
  return noContent(res);
};

export const me = async (req, res) => {
  return ok(res, { user: req.user });
};
