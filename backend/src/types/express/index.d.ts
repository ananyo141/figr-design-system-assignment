import { UserType } from '@models/user';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      role?: UserType;
      partNumber?: number;
    }
  }
}
