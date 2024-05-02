import { NextFunction, Request, Response } from 'express';
import { CustomApiError } from '../errors/custom.error';
export declare const errorHandler: (err: CustomApiError, _req: Request, _res: Response, _next: NextFunction) => any;
