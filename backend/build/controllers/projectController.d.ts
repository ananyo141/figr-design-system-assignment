/// <reference types="qs" />
import { NextFunction, Request, Response } from 'express';
export declare const getUserProjects: (_req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, _res: Response<any, Record<string, any>>, _next: NextFunction) => Promise<void>;
export declare const createProject: (_req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, _res: Response<any, Record<string, any>>, _next: NextFunction) => Promise<void>;
export declare const updateProject: (_req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, _res: Response<any, Record<string, any>>, _next: NextFunction) => Promise<void>;
export declare const getProjectById: (_req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, _res: Response<any, Record<string, any>>, _next: NextFunction) => Promise<void>;
