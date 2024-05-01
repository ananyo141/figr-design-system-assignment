import { NextFunction, Request, Response } from 'express';

import CustomErrors from '@errors/index';
import { UserType } from '@models/user';
import { TokenPayloadType, verifyToken } from '@utils/createJWT';

export const verifyAdminToken = (
  req: Request,
  _: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers['authorization'];
  const token = (authHeader && authHeader.split(' ')[1]) ?? req.cookies?.jwt;
  if (token != null) {
    try {
      const decodedToken: TokenPayloadType = verifyToken(token, UserType.ADMIN);
      console.log(decodedToken);
      if (decodedToken.role !== UserType.ADMIN)
        return next(
          new CustomErrors.ForbiddenError(
            'You are not authorized to access this route'
          )
        );

      req.role = decodedToken.role;
      req.userId = decodedToken.userId;
      req.partNumber = decodedToken.partNumber;
      next();
    } catch (error: any) {
      return next(new CustomErrors.ForbiddenError(error.message));
    }
  } else {
    next(
      new CustomErrors.UnauthorizedError(
        'You are unauthenticated for this access'
      )
    );
  }
};

export const verifyUserToken = (
  req: Request,
  _: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers['authorization'];
  const token = (authHeader && authHeader.split(' ')[1]) ?? req.cookies?.jwt;
  if (token != null) {
    try {
      const decodedToken: TokenPayloadType = verifyToken(token, UserType.USER);
      if (![UserType.ADMIN, UserType.USER].includes(decodedToken.role))
        // if neither admin nor user
        return next(
          new CustomErrors.ForbiddenError(
            'You are not authorized to access this route'
          )
        );
      req.role = decodedToken.role;
      req.userId = decodedToken.userId;
      req.partNumber = decodedToken.partNumber;
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
