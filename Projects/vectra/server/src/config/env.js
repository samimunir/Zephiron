import dotenv from "dotenv";
dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: parseInt(process.env.PORT ?? "5000", 10),
  MONGO_URI: process.env.MONGO_URI ?? "mongodb://localhost:27017/vectra"
};

export default env;