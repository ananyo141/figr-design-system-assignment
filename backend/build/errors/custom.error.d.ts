export declare class CustomApiError extends Error {
    statusCode: number;
    errors: any[];
    constructor(message: string, statusCode: number, errors?: any);
}
