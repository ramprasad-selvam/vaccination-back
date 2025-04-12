export interface IUser {
    name: string,
    email: string,
    password: string,
    role: "provider" | "patient"
}

export interface RegisterUserParams {
    name: string;
    email: string;
    role:  "provider" | "patient";
    password: string;
}

export interface LoginUserParams {
    email: string;
    password: string;
}

export interface IResponse<T = undefined> {
    data: T | undefined,
    httpCode: number;
    statusCode: string;
    message: string,
    error?: string | unknown | null,
}


export interface Auth {
    userId: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            auth: Auth;
        }
    }
}