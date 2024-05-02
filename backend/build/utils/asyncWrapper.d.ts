import { NextFunction, Request, Response } from 'express';
type Callback = (_req: Request, _res: Response, _next: NextFunction) => Promise<void>;
declare const asyncWrapper: (callback: Callback) => Callback;
export default asyncWrapper;
