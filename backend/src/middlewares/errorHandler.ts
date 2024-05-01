// Intercept and serialize errors into readable error messages with status
// codes to be returned to the client.
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomApiError } from '@errors/custom.error';
import { httpResponse } from '@utils/httpResponse';
import logger from '@utils/logger';

export const errorHandler = (
  err: CustomApiError,
  _req: Request,
  _res: Response,
  _next: NextFunction
): any => {
  logger.error(`Error ${err.statusCode}: ${err.message}`);
  return _res
    .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(httpResponse(false, err.message, err.errors));
};
