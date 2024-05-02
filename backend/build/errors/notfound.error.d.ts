import { CustomApiError } from './custom.error';
declare class NotFoundError extends CustomApiError {
    constructor(message: string);
}
export { NotFoundError };
