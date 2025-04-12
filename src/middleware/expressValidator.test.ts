import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ERROR_CODES } from '../constants/app.constants';
import { logger } from '..';
import { sendResponse } from '../utils/handleResponse';
import { validate } from './expressValidator';

jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

jest.mock('..', () => ({
  logger: {
    error: jest.fn(),
  },
}));

jest.mock('../utils/handleResponse', () => ({
  sendResponse: jest.fn(),
}));

describe('validate Middleware', () => {
  it('should call next if there are no validation errors', () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    (validationResult as unknown as jest.Mock).mockReturnValue({
      isEmpty: jest.fn().mockReturnValue(true),
    });

    validate(req, res, next);

    expect(validationResult).toHaveBeenCalledWith(req);
    expect(next).toHaveBeenCalled();
  });

  it('should send response with validation errors if there are validation errors', () => {
    const req = {} as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    const errorsMock = {
      isEmpty: jest.fn().mockReturnValue(false),
      array: jest.fn().mockReturnValue([{ msg: 'Invalid value' }]),
    };

    (validationResult as unknown as jest.Mock).mockReturnValue(errorsMock);

    validate(req, res, next);

    expect(validationResult).toHaveBeenCalledWith(req);
    expect(logger.error).toHaveBeenCalledWith(errorsMock.array());
    expect(sendResponse).toHaveBeenCalledWith(res, 422, ERROR_CODES.FIELDS_ERROR.code, ERROR_CODES.FIELDS_ERROR.message, errorsMock.array());
    expect(next).not.toHaveBeenCalled();
  });
});
