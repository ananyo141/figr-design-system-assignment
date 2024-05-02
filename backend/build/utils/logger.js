"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const exportEnv_constant_1 = require("../constants/exportEnv.constant");
const fs_1 = require("fs");
const path_1 = require("path");
const winston_1 = tslib_1.__importDefault(require("winston"));
const winston_daily_rotate_file_1 = tslib_1.__importDefault(require("winston-daily-rotate-file"));
const logDir = exportEnv_constant_1.nodeEnv === 'production'
    ? (0, path_1.resolve)('./', exportEnv_constant_1.logDir !== null && exportEnv_constant_1.logDir !== void 0 ? exportEnv_constant_1.logDir : 'logs')
    : (0, path_1.resolve)('../../', exportEnv_constant_1.logDir !== null && exportEnv_constant_1.logDir !== void 0 ? exportEnv_constant_1.logDir : 'logs');
if (!(0, fs_1.existsSync)(logDir)) {
    (0, fs_1.mkdirSync)(logDir);
}
const logFormat = winston_1.default.format.printf(
// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston_1.default.createLogger({
    silent: exportEnv_constant_1.nodeEnv === 'test',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), logFormat),
    transports: 
    // log to console in development
    exportEnv_constant_1.nodeEnv === 'development'
        ? [
            new winston_1.default.transports.Console({
                format: winston_1.default.format.combine(winston_1.default.format.splat(), winston_1.default.format.colorize({ all: true })),
            }),
        ]
        : [
            new winston_daily_rotate_file_1.default({
                datePattern: 'YYYY-MM-DD',
                dirname: logDir + '/all',
                filename: `%DATE%.log`,
                maxFiles: 30,
                json: false,
                zippedArchive: true,
            }),
            new winston_daily_rotate_file_1.default({
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
exports.default = logger;
//# sourceMappingURL=logger.js.map