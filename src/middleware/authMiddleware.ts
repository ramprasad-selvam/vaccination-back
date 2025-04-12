import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/handleResponse';
import { ERROR_CODES } from '../constants/app.constants';
import { logger } from '..';

interface JwtPayload {
    id: string;
    role: string;
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    // Extract token from the Authorization header
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        sendResponse(res, 401, ERROR_CODES.UNAUTHORIZED.code, ERROR_CODES.UNAUTHORIZED.message, ERROR_CODES.UNAUTHORIZED.code);
        return;
    }
 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.auth = { userId: decoded.id, role: decoded.role };
        next();
    } catch (error: unknown) {
        if (error instanceof jwt.TokenExpiredError) {
            sendResponse(res, 401, ERROR_CODES.EXPIRED_TOKEN.code, ERROR_CODES.EXPIRED_TOKEN.message, null);
        } else {
            logger.error(error);
            sendResponse(res, 400, ERROR_CODES.INVALID_TOKEN.code, ERROR_CODES.INVALID_TOKEN.message, null);
        }
    }
};

export default verifyToken;
