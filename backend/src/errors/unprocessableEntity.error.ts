import { CustomApiError } from './custom.error';
import { StatusCodes } from 'http-status-codes';

class UnprocessableError extends CustomApiError {
  errors: any[];
  constructor(message: string, errors: any = []) {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY);
    this.errors = errors;
  }
}

export { UnprocessableError };
