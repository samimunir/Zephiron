import dotenv from "dotenv";
dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: parseInt(process.env.PORT ?? "5000", 10),

  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN ?? "http://localhost:5173",

  MONGO_URI: process.env.MONGO_URI ?? "mongodb://localhost:27017/vectra",

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_TTL: process.env.JWT_ACCESS_TTL ?? "15m",
  JWT_REFRESH_TTL: process.env.JWT_REFRESH_TTL ?? "30d",

  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? "",
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ?? "",
  STRIPE_PRICE_BASIC: process.env.STRIPE_PRICE_BASIC ?? "",
  STRIPE_PRICE_PRO: process.env.STRIPE_PRICE_PRO ?? "",

  APP_BASE_URL: process.env.APP_BASE_URL ?? "http://localhost:5173",
  API_BASE_URL: process.env.API_BASE_URL ?? "http://localhost:5000"
};

if (!env.JWT_ACCESS_SECRET || !env.JWT_REFRESH_SECRET) {
  console.warn("⚠️  JWT secrets are not set. Update your .env before deployment.");
}

export default env;