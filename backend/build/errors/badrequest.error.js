"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const custom_error_1 = require("./custom.error");
const http_status_codes_1 = require("http-status-codes");
class BadRequestError extends custom_error_1.CustomApiError {
    constructor(message, errors = []) {
        super(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
        this.errors = errors;
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=badrequest.error.js.map