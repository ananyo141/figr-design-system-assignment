"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomApiError = void 0;
class CustomApiError extends Error {
    constructor(message, statusCode, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
exports.CustomApiError = CustomApiError;
//# sourceMappingURL=custom.error.js.map