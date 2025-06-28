import chalk from "chalk";
import { addColors, createLogger, format, transports } from "winston";

const isProduction = process.env.NODE_ENV === "production";

addColors({
  info: "cyan",
  error: "red",
  warn: "yellow",
  debug: "magenta",
  http: "blue",
});

const devFormat = format.printf(
  ({ level, message, timestamp, requestId, duration }) => {
    const colorizer = format.colorize();
    let msg = `${chalk.gray(timestamp)} ${colorizer.colorize(level, `[${level.toUpperCase()}]`)}: `;

    if (requestId) {
      msg += chalk.cyanBright(`[${requestId}] `);
    }

    msg += String(message);

    if (duration) {
      msg += chalk.yellowBright(` (${duration}ms)`);
    }

    return msg;
  },
);

const logger = createLogger({
  level: isProduction ? "info" : "debug",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    isProduction ? format.json() : devFormat,
  ),
  transports: [new transports.Console()],
});

export default logger;
