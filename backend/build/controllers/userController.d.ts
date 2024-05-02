/// <reference types="qs" />
import { NextFunction, Request, Response } from 'express';
export declare const loginUser: (_req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, _res: Response<any, Record<string, any>>, _next: NextFunction) => Promise<void>;
export declare const registerUser: (_req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, _res: Response<any, Record<string, any>>, _next: NextFunction) => Promise<void>;
export declare const getProfile: (_req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, _res: Response<any, Record<string, any>>, _next: NextFunction) => Promise<void>;
export declare const updateProfile: (_req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, _res: Response<any, Record<string, any>>, _next: NextFunction) => Promise<void>;
export declare const updatePassword: (_req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, _res: Response<any, Record<string, any>>, _next: NextFunction) => Promise<void>;
