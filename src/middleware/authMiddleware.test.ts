import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/handleResponse';
import { ERROR_CODES } from '../constants/app.constants';
import verifyToken from './authMiddleware';

jest.mock('jsonwebtoken');
jest.mock('../utils/handleResponse');

describe('verifyToken Middleware', () => {
  it('should call next if token is valid', () => {
    const req = {
      header: jest.fn().mockReturnValue('Bearer validToken'),
      auth: {},
    } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    const decodedMock = { id: 'user123', role: 'user' };
    (jwt.verify as jest.Mock).mockReturnValue(decodedMock);

    verifyToken(req, res, next);

    expect(req.header).toHaveBeenCalledWith('Authorization');
    expect(jwt.verify).toHaveBeenCalledWith('validToken', process.env.JWT_SECRET);
    expect(req.auth).toEqual({ userId: decodedMock.id, role: decodedMock.role });
    expect(next).toHaveBeenCalled();
  });

  it('should send unauthorized response if token is missing', () => {
    const req = {
      header: jest.fn().mockReturnValue(undefined),
    } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    verifyToken(req, res, next);

    expect(req.header).toHaveBeenCalledWith('Authorization');
    expect(sendResponse).toHaveBeenCalledWith(res, 401, ERROR_CODES.UNAUTHORIZED.code, ERROR_CODES.UNAUTHORIZED.message, ERROR_CODES.UNAUTHORIZED.code);
    expect(next).not.toHaveBeenCalled();
  });

  it('should send expired token response if token is expired', () => {
    const req = {
      header: jest.fn().mockReturnValue('Bearer expiredToken'),
    } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new jwt.TokenExpiredError('jwt expired', new Date());
    });

    verifyToken(req, res, next);

    expect(req.header).toHaveBeenCalledWith('Authorization');
    expect(jwt.verify).toHaveBeenCalledWith('expiredToken', process.env.JWT_SECRET);
    expect(sendResponse).toHaveBeenCalledWith(res, 401, ERROR_CODES.EXPIRED_TOKEN.code, ERROR_CODES.EXPIRED_TOKEN.message, null);
    expect(next).not.toHaveBeenCalled();
  });

  it('should send invalid token response if token is invalid', () => {
    const req = {
      header: jest.fn().mockReturnValue('Bearer invalidToken'),
    } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    verifyToken(req, res, next);

    expect(req.header).toHaveBeenCalledWith('Authorization');
    expect(jwt.verify).toHaveBeenCalledWith('invalidToken', process.env.JWT_SECRET);
    expect(sendResponse).toHaveBeenCalledWith(res, 400, ERROR_CODES.INVALID_TOKEN.code, ERROR_CODES.INVALID_TOKEN.message, null);
    expect(next).not.toHaveBeenCalled();
  });
});