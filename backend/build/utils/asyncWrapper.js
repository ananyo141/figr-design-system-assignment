"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = tslib_1.__importDefault(require("../errors/index"));
const logger_1 = tslib_1.__importDefault(require("./logger"));
// Generate a wrapper function that executes the callback function
// safely and handles any errors that may occur
const asyncWrapper = (callback) => async (_req, _res, _next) => {
    try {
        await callback(_req, _res, _next);
    }
    catch (error) {
        logger_1.default.error(error.message);
        _next(new index_1.default.InternalServerError(`Something went wrong ${error.message}`));
    }
};
exports.default = asyncWrapper;
//# sourceMappingURL=asyncWrapper.js.map