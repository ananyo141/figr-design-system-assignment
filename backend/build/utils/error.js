"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSchemaError = exports.BadRequest = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("lodash"));
function BadRequest(message, error, code) {
    return { code: code !== null && code !== void 0 ? code : 400, message, error };
}
exports.BadRequest = BadRequest;
function formatSchemaError(schemaValidationError) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!_.isEmpty(schemaValidationError)) {
        const errorMessage = schemaValidationError.details
            .map((detail) => detail.message)
            .join(', ');
        throw new Error(errorMessage);
    }
}
exports.formatSchemaError = formatSchemaError;
//# sourceMappingURL=error.js.map