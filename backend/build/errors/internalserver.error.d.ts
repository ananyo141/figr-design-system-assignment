import { CustomApiError } from './custom.error';
declare class InternalServerError extends CustomApiError {
    constructor(message: string);
}
export { InternalServerError };
