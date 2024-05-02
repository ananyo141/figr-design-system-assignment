"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.LOG_DIR = exports.ORIGIN = exports.NODE_ENV = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
if (process.env.NODE_ENV === 'development') {
    console.info('Using .env.docker');
    (0, dotenv_1.config)();
}
else if (process.env.NODE_ENV === 'test') {
    console.info('Using .env.test');
    (0, dotenv_1.config)({ path: '.env.test' });
}
else {
    (0, dotenv_1.config)();
}
_a = process.env, exports.PORT = _a.PORT, exports.NODE_ENV = _a.NODE_ENV, exports.ORIGIN = _a.ORIGIN, exports.LOG_DIR = _a.LOG_DIR, exports.MONGO_URI = _a.MONGO_URI;
//# sourceMappingURL=env.constant.js.map