export interface IUser {
    name: string,
    email: string,
    gender: string,
    age: number,
    phoneNumber: number,
    password: string,
    role: "doctor" | "patient" | "admin",
}

export interface RegisterUserParams {
    name: string;
    email: string;
    phoneNumber: number;
    gender: string;
    age: number;
    role: "doctor" | "patient" | "admin";
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