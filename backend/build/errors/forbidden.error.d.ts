import { CustomApiError } from './custom.error';
declare class ForbiddenError extends CustomApiError {
    constructor(message: string);
}
export { ForbiddenError };
