import { Response } from "express";

export const sendResponse = <T>( res: Response, httpCode: number, statusCode: string, message: string, error?: unknown | null, data?: T) => {
    res.status(httpCode).json({data, statusCode, message, error });
    return;
}