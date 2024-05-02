"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const tslib_1 = require("tslib");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const JWT_USER_KEY = process.env.JWT_KEY;
const createToken = (userId) => {
    const payload = {
        userId: userId,
    };
    const options = {
        expiresIn: '90d', // Token expiration time
    };
    return jwt.sign(payload, JWT_USER_KEY, options);
};
exports.createToken = createToken;
const verifyToken = (token) => {
    return jwt.verify(token, JWT_USER_KEY);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=createJWT.js.map