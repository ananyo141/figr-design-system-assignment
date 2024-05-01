import { logDir as LogDirectory, nodeEnv } from '@constants/exportEnv.constant';
import { existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';

const logDir =
  nodeEnv === 'production'
    ? resolve('./', LogDirectory ?? 'logs')
    : resolve('../../', LogDirectory ?? 'logs');

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

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
    // log to console in development
    nodeEnv === 'development'
      ? [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.splat(),
              winston.format.colorize({ all: true })
            ),
          }),
        ]
      : [
          new WinstonDaily({
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/all',
            filename: `%DATE%.log`,
            maxFiles: 30,
            json: false,
            zippedArchive: true,
          }),

          new WinstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: `%DATE%.log`,
            maxFiles: 30,
            handleExceptions: true,
            json: false,
            zippedArchive: true,
          }),
        ],
});

export default logger;
