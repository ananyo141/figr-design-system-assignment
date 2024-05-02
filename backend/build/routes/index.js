"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const projectRoutes_1 = tslib_1.__importDefault(require("./projectRoutes"));
const userRoutes_1 = tslib_1.__importDefault(require("./userRoutes"));
exports.router = (0, express_1.Router)();
exports.default = () => {
    (0, userRoutes_1.default)(exports.router);
    (0, projectRoutes_1.default)(exports.router);
    return exports.router;
};
//# sourceMappingURL=index.js.map