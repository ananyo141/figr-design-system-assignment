"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNotFound = void 0;
const tslib_1 = require("tslib");
const errors_1 = tslib_1.__importDefault(require("../errors"));
const routeNotFound = (_req, _res) => {
    throw new errors_1.default.NotFoundError('Bad method or route does not exist');
};
exports.routeNotFound = routeNotFound;
//# sourceMappingURL=routeNotFound.js.map