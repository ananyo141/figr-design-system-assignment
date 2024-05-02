import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ErrorType,
} from '@constants/config.constant';

import compression from 'compression';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { nodeEnv, origin, port } from '@constants/exportEnv.constant';

import { initDb } from '@database/connect.database';
import { errorHandler } from '@middlewares/errorHandler';
import { routeNotFound } from '@middlewares/routeNotFound';
import logger from '@utils/logger';
import router from './routes';
import { httpResponse } from '@utils/httpResponse';

const app = express();

const establishDatabaseConnection = async (): Promise<void> => {
  try {
    await initDb();
    logger.info('Succesfully made database connection');
  } catch (error: ErrorType) {
    logger.error(error);
  }
};

function initMiddleware(): void {
  app.use(compression());
  app.use(express.json({ limit: '500kb' }));
  app.use(
    cors({
      origin,
    })
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('[:date[web]] :method :url :status :response-time ms'));
}

function initRouter(): void {
  app.use('/', router());
  app.get('/', (_, res) => {
    res.json(httpResponse(true, 'Server is running'));
  });
  app.use(routeNotFound);
  app.use(errorHandler);
}

function initServer(): void {
  app.listen(port, () => {
    logger.info(`Server is running at http://localhost:${port}`);
    logger.info(`Server started In ENV: ${nodeEnv}`);
  });
  app.on('error', onError);
}

export async function init(): Promise<void> {
  try {
    logger.info('init');
    initMiddleware();
    initRouter();
    if (nodeEnv === 'test') return;

    initServer();
    await establishDatabaseConnection();
  } catch (err: ErrorType) {
    logger.error('Unable to initialize app: ', err.message);
    logger.error(err);
  }
}

init();

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const bind = typeof port === 'string' ? 'Pipe ' + port : `Port ${port}`;

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
