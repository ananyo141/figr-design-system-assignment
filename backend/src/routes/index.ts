import { Router } from 'express';

import userRoutes from './userRoutes';

export const router: Router = Router();

export default (): Router => {
  userRoutes(router);

  return router;
};
