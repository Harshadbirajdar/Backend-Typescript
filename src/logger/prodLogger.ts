import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;
const myFormat = printf(({ level, message, timestamp }) => {
  return `[${level}] ${timestamp}: ${message}`;
});
const prodLogger = () => {
  return createLogger({
    level: "info",
    format: combine(timestamp(), myFormat),
    transports: [
      new transports.Console(),
      new transports.File({ filename: "error.log", level: "error" }),
      new transports.File({ filename: "combine.log" }),
    ],
    exceptionHandlers: [new transports.File({ filename: "exceptions.log" })],
  });
};
export default prodLogger;
