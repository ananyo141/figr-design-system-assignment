import { CustomApiError } from './custom.error';
declare class UnauthorizedError extends CustomApiError {
    constructor(message: string);
}
export { UnauthorizedError };
