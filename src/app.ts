import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import { authLimiter } from "./middleware/rateLimiter";
import config from "./config";
import router from "./route/v1";
import { errorHandler, notFound } from "./middleware/error";

const app: Application = express();

app.use(cors());

// Limited to development environment
if (config.env === "development") {
  app.use(morgan("dev"));
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Sanitize user-generated content
app.use(xss());
app.use(mongoSanitize());

// rate limiter for authentication routes
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}

app.use(config.PREFIX, router);

app.use(notFound);
app.use(errorHandler);
export default app;
