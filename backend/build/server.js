"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const compression_1 = tslib_1.__importDefault(require("compression"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const express_1 = tslib_1.__importDefault(require("express"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const exportEnv_constant_1 = require("./constants/exportEnv.constant");
const connect_database_1 = require("./database/connect.database");
const errorHandler_1 = require("./middlewares/errorHandler");
const routeNotFound_1 = require("./middlewares/routeNotFound");
const logger_1 = tslib_1.__importDefault(require("./utils/logger"));
const routes_1 = tslib_1.__importDefault(require("./routes"));
const httpResponse_1 = require("./utils/httpResponse");
const app = (0, express_1.default)();
const establishDatabaseConnection = async () => {
    try {
        await (0, connect_database_1.initDb)();
        logger_1.default.info('Succesfully made database connection');
    }
    catch (error) {
        logger_1.default.error(error);
    }
};
function initMiddleware() {
    app.use((0, compression_1.default)());
    app.use(express_1.default.json({ limit: '500kb' }));
    app.use((0, cors_1.default)({
        origin: exportEnv_constant_1.origin,
    }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, morgan_1.default)('[:date[web]] :method :url :status :response-time ms'));
}
function initRouter() {
    app.use('/', (0, routes_1.default)());
    app.get('/', (_, res) => {
        res.json((0, httpResponse_1.httpResponse)(true, 'Server is running'));
    });
    app.use(routeNotFound_1.routeNotFound);
    app.use(errorHandler_1.errorHandler);
}
function initServer() {
    app.listen(exportEnv_constant_1.port, () => {
        logger_1.default.info(`Server is running at http://localhost:${exportEnv_constant_1.port}`);
        logger_1.default.info(`Server started In ENV: ${exportEnv_constant_1.nodeEnv}`);
    });
    app.on('error', onError);
}
async function init() {
    try {
        logger_1.default.info('init');
        initMiddleware();
        initRouter();
        if (exportEnv_constant_1.nodeEnv === 'test')
            return;
        initServer();
        await establishDatabaseConnection();
    }
    catch (err) {
        logger_1.default.error('Unable to initialize app: ', err.message);
        logger_1.default.error(err);
    }
}
exports.default = init;
init();
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const bind = typeof exportEnv_constant_1.port === 'string' ? 'Pipe ' + exportEnv_constant_1.port : `Port ${exportEnv_constant_1.port}`;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }
}
//# sourceMappingURL=server.js.map