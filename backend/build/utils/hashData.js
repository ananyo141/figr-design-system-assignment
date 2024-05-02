"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHashedData = exports.hashData = void 0;
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const hashData = async (data, saltRounds = 8) => {
    try {
        const hashedData = await bcrypt_1.default.hash(data, saltRounds);
        return hashedData;
    }
    catch (error) {
        throw new Error(`Error hashing. ${error}`);
    }
};
exports.hashData = hashData;
const verifyHashedData = async (unhashed, hashed) => {
    try {
        const match = await bcrypt_1.default.compare(unhashed, hashed);
        return match;
    }
    catch (error) {
        throw new Error(`Error in comparing hashed string with entered string. ${error}`);
    }
};
exports.verifyHashedData = verifyHashedData;
//# sourceMappingURL=hashData.js.map