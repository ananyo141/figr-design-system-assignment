import { NotFoundError } from './notfound.error';
import { BadRequestError } from './badrequest.error';
import { ForbiddenError } from './forbidden.error';
import { UnauthorizedError } from './unauthorized.error';
import { InternalServerError } from './internalserver.error';
import { UnprocessableError } from './unprocessableEntity.error';
declare const _default: {
    NotFoundError: typeof NotFoundError;
    BadRequestError: typeof BadRequestError;
    ForbiddenError: typeof ForbiddenError;
    UnauthorizedError: typeof UnauthorizedError;
    UnprocessableError: typeof UnprocessableError;
    InternalServerError: typeof InternalServerError;
};
export default _default;
