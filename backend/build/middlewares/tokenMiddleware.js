"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserToken = void 0;
const tslib_1 = require("tslib");
const index_1 = tslib_1.__importDefault(require("../errors/index"));
const createJWT_1 = require("../utils/createJWT");
const verifyUserToken = (req, _, next) => {
    var _a, _b;
    const authHeader = req.headers['authorization'];
    const token = (_a = (authHeader && authHeader.split(' ')[1])) !== null && _a !== void 0 ? _a : (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.jwt;
    if (token != null) {
        try {
            const decodedToken = (0, createJWT_1.verifyToken)(token);
            req.userId = decodedToken.userId;
            next();
        }
        catch (error) {
            return next(new index_1.default.ForbiddenError('Invalid token'));
        }
    }
    else {
        next(new index_1.default.UnauthorizedError('You are unauthenticated for this access'));
    }
};
exports.verifyUserToken = verifyUserToken;
//# sourceMappingURL=tokenMiddleware.js.map