"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpResponse = void 0;
const httpResponse = (success, message, data = {}, page = 1) => {
    return Object.freeze({
        success,
        message,
        page,
        data,
    });
};
exports.httpResponse = httpResponse;
//# sourceMappingURL=httpResponse.js.map