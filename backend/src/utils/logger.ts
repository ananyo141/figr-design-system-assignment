import { nodeEnv } from '@constants/exportEnv.constant';
import winston from 'winston';

const logFormat = winston.format.printf(
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  silent: nodeEnv === 'test',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat
  ),
  transports:
    // log to console
    [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.splat(),
          winston.format.colorize({ all: true })
        ),
      }),
    ],
});

export default logger;
