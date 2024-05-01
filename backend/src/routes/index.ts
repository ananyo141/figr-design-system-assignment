import { Router } from 'express';
import projectRoutes from './projectRoutes';

import userRoutes from './userRoutes';

export const router: Router = Router();

export default (): Router => {
  userRoutes(router);
  projectRoutes(router);

  return router;
};
