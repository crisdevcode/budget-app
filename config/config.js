import { config } from "dotenv";

config({ path: "./config/config.env" });

export default {
  host: process.env.HOST || "",
  database: process.env.DATABASE || "",
  user: process.env.USER || "",
  password: process.env.PASSWORD || "",
  NODE_ENV: process.env.NODE_ENV,
};
