import { NextFunction, Request, Response } from 'express';

import CustomError from '@errors/index';
import logger from '@utils/logger';
import { ZodSchema } from 'zod';

export const validateSchema = (
  schema: ZodSchema,
  message = 'Unprocessable Entity'
) => {
  return async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      _req.body = schema.parse(_req.body);
      _next();
    } catch (err: any) {
      logger.info(err);
      return _next(new CustomError.UnprocessableError(message, err.errors));
    }
  };
};
