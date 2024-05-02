"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const tslib_1 = require("tslib");
const index_1 = tslib_1.__importDefault(require("../errors/index"));
const logger_1 = tslib_1.__importDefault(require("../utils/logger"));
const validateSchema = (schema, message = 'Unprocessable Entity') => {
    return async (_req, _res, _next) => {
        try {
            _req.body = schema.parse(_req.body);
            _next();
        }
        catch (err) {
            logger_1.default.info(err);
            return _next(new index_1.default.UnprocessableError(message, err.errors));
        }
    };
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validatorMiddleware.js.map