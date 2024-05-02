"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const custom_error_1 = require("./custom.error");
const http_status_codes_1 = require("http-status-codes");
class InternalServerError extends custom_error_1.CustomApiError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=internalserver.error.js.map