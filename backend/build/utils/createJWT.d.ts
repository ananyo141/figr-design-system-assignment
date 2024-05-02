export interface TokenPayloadType {
    userId: string;
}
export declare const createToken: (userId: string) => string;
export declare const verifyToken: (token: string) => TokenPayloadType;
