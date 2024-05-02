"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableError = void 0;
const custom_error_1 = require("./custom.error");
const http_status_codes_1 = require("http-status-codes");
class UnprocessableError extends custom_error_1.CustomApiError {
    constructor(message, errors = []) {
        super(message, http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY);
        this.errors = errors;
    }
}
exports.UnprocessableError = UnprocessableError;
//# sourceMappingURL=unprocessableEntity.error.js.map