import { CustomApiError } from './custom.error';
declare class BadRequestError extends CustomApiError {
    errors: any[];
    constructor(message: string, errors?: any);
}
export { BadRequestError };
