import { NextFunction, Request, Response } from 'express';

import CustomErrors from '@errors/index';
import { TokenPayloadType, verifyToken } from '@utils/createJWT';

export const verifyUserToken = (
  req: Request,
  _: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers['authorization'];
  const token = (authHeader && authHeader.split(' ')[1]) ?? req.cookies?.jwt;
  if (token != null) {
    try {
      const decodedToken: TokenPayloadType = verifyToken(token);
      req.userId = decodedToken.userId;
      next();
    } catch (error) {
      return next(new CustomErrors.ForbiddenError('Invalid token'));
    }
  } else {
    next(
      new CustomErrors.UnauthorizedError(
        'You are unauthenticated for this access'
      )
    );
  }
};
