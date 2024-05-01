import { Router } from 'express';

import {
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
} from '@controllers/userController';
import { verifyUserToken } from '@middlewares/tokenMiddleware';
import { validateSchema } from '@middlewares/validatorMiddleware';
import { userSchema, loginSchema } from '@schema/userSchema';

export default (router: Router): void => {
  router.post(
    '/login',
    verifyUserToken,
    validateSchema(loginSchema.strict()),
    loginUser
  );
  router.post(
    '/register',
    verifyUserToken,
    validateSchema(userSchema.strict()),
    registerUser
  );
  router
    .route('/:id')
    .patch(verifyUserToken, validateSchema(userSchema.partial()), updateProfile)
    .get(verifyUserToken, getProfile);
};
