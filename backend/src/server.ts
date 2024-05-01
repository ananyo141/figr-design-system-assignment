import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ErrorType,
} from '@constants/config.constant';

import compression from 'compression';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import http from 'http';
import morgan from 'morgan';

import { nodeEnv, origin, port } from '@constants/exportEnv.constant';

import { initDb } from '@database/connect.database';
import { errorHandler } from '@middlewares/errorHandler';
import { routeNotFound } from '@middlewares/routeNotFound';
import { verifySocketToken } from '@middlewares/socketAuth';
import logger from '@utils/logger';
import { healthCheckBody } from '@utils/message/successMessage';
import { initMail } from '@utils/sendMail';
import { initBucket } from '@utils/uploadToBucket';
import { Server } from 'socket.io';
import router from './routes';
import { UserType } from '@models/user';

export const app = express();
export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin,
  },
});

io.use(verifySocketToken).on('connection', (socket) => {
  logger.debug('id -> ', socket.data.userId);
  logger.info(`New ${socket.data.role} connected: ${socket.data.userId}`);
  if (socket.data.role === UserType.ADMIN) {
    socket.join('admin');
  }
  socket.on('disconnect', () => {
    if (socket.data.role === UserType.ADMIN) {
      socket.leave('admin');
    }
    logger.info('Client disconnected');
  });
});

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
  app.get('/healthCheck', (_, res) => {
    res.json(healthCheckBody(port));
  });

  app.use('/', router());
  app.use(routeNotFound);
  app.use(errorHandler);
}

function initServer(): void {
  server.listen(port, () => {
    logger.info(`Server is running at http://localhost:${port}`);
    logger.info(`Server started In ENV: ${nodeEnv}`);
  });
  server.on('error', onError);
}

export async function init(): Promise<void> {
  try {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    logger.info('init');
    initMiddleware();
    initRouter();
    if (nodeEnv === 'test') return;

    initServer();
    await establishDatabaseConnection();
    await initBucket();
    initMail();
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
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
