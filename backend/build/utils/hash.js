"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashResourceID = void 0;
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
function hashResourceID(object) {
    const hash = crypto_1.default.createHash('md5');
    hash.update(JSON.stringify(object));
    return hash.digest('hex');
}
exports.hashResourceID = hashResourceID;
//# sourceMappingURL=hash.js.map