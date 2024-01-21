import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import morgan from "morgan";
import xss from "xss-clean";

import config from "./config";
import { errorHandler, notFound } from "./middleware/error";
import { authLimiter } from "./middleware/rateLimiter";
import requestInfo from "./middleware/requestInfo";
import router from "./route/v1";

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

// log all request data
app.use(requestInfo);

app.use(config.PREFIX, router);

app.use(notFound);
app.use(errorHandler);
export default app;
