import type { Router } from 'express';

import {
  createProject,
  updateProject,
  getProjectById,
  getUserProjects,
} from '@controllers/projectController';
import { verifyUserToken } from '@middlewares/tokenMiddleware';
import { validateSchema } from '@middlewares/validatorMiddleware';
import { userSchema, loginSchema } from '@schema/userSchema';

export default (router: Router): void => {
  router
    .route('/projects')
    .get(verifyUserToken, getUserProjects)
    .post(verifyUserToken, validateSchema(loginSchema.strict()), createProject);
  router
    .route('/projects/:id')
    .get(verifyUserToken, getProjectById)
    .patch(
      verifyUserToken,
      validateSchema(userSchema.strict().partial()),
      updateProject
    );
};
