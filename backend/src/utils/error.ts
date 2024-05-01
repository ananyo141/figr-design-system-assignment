import * as _ from 'lodash';
export function BadRequest(
  message: string,
  error?: any,
  code?: number
): { code: number; message: any; error: any } {
  return { code: code ?? 400, message, error };
}

export function formatSchemaError(schemaValidationError: any): void {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!_.isEmpty(schemaValidationError)) {
    const errorMessage = schemaValidationError.details
      .map((detail: any) => detail.message)
      .join(', ');
    throw new Error(errorMessage);
  }
}
