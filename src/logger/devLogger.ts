import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});
const devLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(colorize(), timestamp({ format: "HH:mm:ss" }), myFormat),
    transports: [new transports.Console()],
    exceptionHandlers: [new transports.Console()],
  });
};

export default devLogger;
