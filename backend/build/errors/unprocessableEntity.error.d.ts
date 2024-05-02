import { CustomApiError } from './custom.error';
declare class UnprocessableError extends CustomApiError {
    errors: any[];
    constructor(message: string, errors?: any);
}
export { UnprocessableError };
