import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
export declare const validateSchema: (schema: ZodSchema, message?: string) => (_req: Request, _res: Response, _next: NextFunction) => Promise<void>;
