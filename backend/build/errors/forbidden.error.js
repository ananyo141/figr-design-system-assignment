"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
const custom_error_1 = require("./custom.error");
const http_status_codes_1 = require("http-status-codes");
class ForbiddenError extends custom_error_1.CustomApiError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.FORBIDDEN);
    }
}
exports.ForbiddenError = ForbiddenError;
//# sourceMappingURL=forbidden.error.js.map