import * as jwt from 'jsonwebtoken';

const JWT_USER_KEY = process.env.JWT_USER_KEY;

export interface TokenPayloadType {
  userId: string;
}

export const createToken = (userId: string): string => {
  const payload: TokenPayloadType = {
    userId: userId,
  };
  const options: jwt.SignOptions = {
    expiresIn: '90d', // Token expiration time
  };

  return jwt.sign(payload, JWT_USER_KEY as string, options);
};

export const verifyToken = (
  token: string,
): TokenPayloadType => {
  return jwt.verify(token, JWT_USER_KEY as string) as TokenPayloadType;
};
