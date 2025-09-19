import mongoose from "mongoose";
import env from "./env.js";
import logger from "./logger.js";

mongoose.set("strictQuery", true);

let cached = { conn: null, promise: null };
let readinessFlag = false;

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    logger.info("Connecting to MongoDB…");
    cached.promise = mongoose.connect(env.MONGO_URI, {
      maxPoolSize: 10,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      autoIndex: env.NODE_ENV !== "production"
    }).then((m) => {
      readinessFlag = true;
      logger.info("✅ MongoDB connected");
      return m;
    }).catch((err) => {
      logger.error({ err }, "❌ MongoDB connection failed");
      process.exitCode = 1;
      throw err;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export function isDBReady() {
  return readinessFlag && mongoose.connection.readyState === 1;
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    readinessFlag = false;
    logger.info("🔌 MongoDB disconnected");
  }
}