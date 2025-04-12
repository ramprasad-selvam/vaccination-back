import { Response, Request, NextFunction} from "express";
import AppError from "../utils/AppError";
import { ERROR_CODES } from "../constants/app.constants";
import { logger } from "..";

/**
 * Global error handling middleware for Express
 * @param err - The error object that was thrown
 * @param req - The Express request object
 * @param res - The Express response object
 * @param next - The next middleware function (not used but required for Express error handling)
 */
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        res.status(err.httpCode).json({        
            success: false,
            statusCode: err.statusCode,
            message: err.message
        })
        return
    }
    logger.error("Unexpected Error : ", err.stack);
    res.status(500).json({        
        success: false,
        statusCode: ERROR_CODES.SERVER_ERROR.code,
        message: ERROR_CODES.SERVER_ERROR.message
    })
}