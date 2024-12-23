import { AppConfig } from "../types/appConfig";
import dotenv from "dotenv";

dotenv.config();

const appConfig: AppConfig = {
  port: Number(process.env.PORT),
  pageLimit: 10,
  dbUrl: process.env.DB_URI,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: {
      accessToken: process.env.JWT_ACCESS_EXPIRES_IN,
      refreshToken: process.env.JWT_REFRESH_EXPIRES_IN,
    },
  },
  cors: {
    origin: [
      "http://localhost:2395",
      "http://localhost:8275",
      "http://localhost:6290",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
};

module.exports = appConfig;
