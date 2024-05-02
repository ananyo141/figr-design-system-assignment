"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = void 0;
const exportEnv_constant_1 = require("../constants/exportEnv.constant");
const mongoose_1 = require("mongoose");
async function initDb() {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!exportEnv_constant_1.mongoUri)
        throw new Error('invalid mongodb URI');
    if (exportEnv_constant_1.nodeEnv !== 'production') {
        (0, mongoose_1.set)('debug', true);
    }
    const db = await (0, mongoose_1.connect)(exportEnv_constant_1.mongoUri);
    return db;
}
exports.initDb = initDb;
//# sourceMappingURL=connect.database.js.map