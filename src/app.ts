import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authLimiter } from "./middleware/rateLimiter";
import config from "./config";
import router from "./route/v1";
import errorHandler from "./util/ErrorHandler";

const app: Application = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// rate limiter for authentication routes
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}

app.use(config.PREFIX, router);

app.use(errorHandler);
export default app;
