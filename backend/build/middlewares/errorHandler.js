"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const tslib_1 = require("tslib");
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const logger_1 = tslib_1.__importDefault(require("../utils/logger"));
const errorHandler = (err, _req, _res, _next) => {
    logger_1.default.error(`Error ${err.statusCode}: ${err.message}`);
    return _res
        .status(err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .json((0, httpResponse_1.httpResponse)(false, err.message, err.errors));
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map