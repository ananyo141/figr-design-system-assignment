"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const exportEnv_constant_1 = require("../constants/exportEnv.constant");
const winston_1 = tslib_1.__importDefault(require("winston"));
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
    // log to console
    [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.splat(), winston_1.default.format.colorize({ all: true })),
        }),
    ],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map