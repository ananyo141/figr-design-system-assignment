import * as jwt from 'jsonwebtoken';
import { UserType } from '@models/user';

const JWT_ADMIN_KEY = process.env.JWT_USER_KEY;
const JWT_USER_KEY = process.env.JWT_USER_KEY;

export interface TokenPayloadType {
  userId: string;
  role: UserType;
  partNumber?: number;
}

export const createToken = (userId: string, typeofUser: UserType, partNumber: number): string => {
  const payload: TokenPayloadType = {
    userId: userId,
    role: typeofUser,
    partNumber,
  };
  const options: jwt.SignOptions = {
    expiresIn: '90d', // Token expiration time
  };
  if (typeofUser === UserType.ADMIN)
    return jwt.sign(payload, JWT_ADMIN_KEY as string, options);

  return jwt.sign(payload, JWT_USER_KEY as string, options);
};

export const verifyToken = (
  token: string,
  typeofUser: UserType = UserType.USER
): TokenPayloadType => {
  if (typeofUser === UserType.ADMIN)
    return jwt.verify(token, JWT_ADMIN_KEY as string) as TokenPayloadType;
  return jwt.verify(token, JWT_USER_KEY as string) as TokenPayloadType;
};
