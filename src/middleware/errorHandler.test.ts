import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';
import { ERROR_CODES } from '../constants/app.constants';
import { logger } from '..';
import { errorHandler } from './errorHandler';

jest.mock('..', () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe('errorHandler Middleware', () => {
  it('should handle AppError correctly', () => {
    const err = new AppError(400, ERROR_CODES.INVALID_TOKEN.code, ERROR_CODES.INVALID_TOKEN.message);
    const req = {} as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      statusCode: ERROR_CODES.INVALID_TOKEN.code,
      message: ERROR_CODES.INVALID_TOKEN.message,
    });
  });

  it('should handle unexpected errors correctly', () => {
    const err = new Error('Unexpected Error');
    const req = {} as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    errorHandler(err, req, res, next);

    expect(logger.error).toHaveBeenCalledWith('Unexpected Error : ', err.stack);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      statusCode: ERROR_CODES.SERVER_ERROR.code,
      message: ERROR_CODES.SERVER_ERROR.message,
    });
  });
});
