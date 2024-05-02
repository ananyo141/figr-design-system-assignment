"use strict";
// Compilation of common errors for reuse, throw them as needed
// Express intercepts exceptions and sends them to the error handler
Object.defineProperty(exports, "__esModule", { value: true });
const notfound_error_1 = require("./notfound.error");
const badrequest_error_1 = require("./badrequest.error");
const forbidden_error_1 = require("./forbidden.error");
const unauthorized_error_1 = require("./unauthorized.error");
const internalserver_error_1 = require("./internalserver.error");
const unprocessableEntity_error_1 = require("./unprocessableEntity.error");
exports.default = {
    NotFoundError: notfound_error_1.NotFoundError,
    BadRequestError: badrequest_error_1.BadRequestError,
    ForbiddenError: forbidden_error_1.ForbiddenError,
    UnauthorizedError: unauthorized_error_1.UnauthorizedError,
    UnprocessableError: unprocessableEntity_error_1.UnprocessableError,
    InternalServerError: internalserver_error_1.InternalServerError,
};
//# sourceMappingURL=index.js.map