export declare function BadRequest(message: string, error?: any, code?: number): {
    code: number;
    message: any;
    error: any;
};
export declare function formatSchemaError(schemaValidationError: any): void;
