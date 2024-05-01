// Compilation of common errors for reuse, throw them as needed
// Express intercepts exceptions and sends them to the error handler

import { NotFoundError } from './notfound.error';
import { BadRequestError } from './badrequest.error';
import { ForbiddenError } from './forbidden.error';
import { UnauthorizedError } from './unauthorized.error';
import { InternalServerError } from './internalserver.error';
import { UnprocessableError } from './unprocessableEntity.error';

export default {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
  UnprocessableError,
  InternalServerError,
};
