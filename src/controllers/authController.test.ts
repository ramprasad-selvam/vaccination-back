import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/handleResponse';
import { CUSTOM_CODES } from '../constants/app.constants';
import { logger } from '..';
import { userLogin, userRegister } from '../service/authService';
import { Login_User, Register_User } from './authController';

jest.mock('../service/authService');
jest.mock('../utils/handleResponse');
jest.mock('..', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Auth Controllers', () => {
  describe('Login_User', () => {
    it('should login user successfully', async () => {
      const req = { body: { email: 'test@example.com', password: 'password123' } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const next = jest.fn() as NextFunction;

      const responseMock = { name: 'Test User', role: 'user', token: 'token123' };
      (userLogin as jest.Mock).mockResolvedValue(responseMock);

      await Login_User(req, res, next);

      expect(userLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(sendResponse).toHaveBeenCalledWith(res, 200, CUSTOM_CODES.LOGIN_SUCCESS.message, CUSTOM_CODES.LOGIN_SUCCESS.code, null, responseMock);
      expect(logger.info).toHaveBeenCalledWith(CUSTOM_CODES.LOGIN_SUCCESS.code);
    });

    it('should handle errors', async () => {
      const req = { body: { email: 'test@example.com', password: 'password123' } } as Request;
      const res = {} as Response;
      const next = jest.fn() as NextFunction;

      const error = new Error('Service Error');
      (userLogin as jest.Mock).mockRejectedValue(error);

      await Login_User(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(logger.error).toHaveBeenCalledWith(error);
    });
  });

  describe('Register_User', () => {
    it('should register user successfully', async () => {
      const req = { body: { name: 'Test User', email: 'test@example.com', password: 'password123' } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const next = jest.fn() as NextFunction;

      const responseMock = { name: 'Test User' };
      (userRegister as jest.Mock).mockResolvedValue(responseMock);

      await Register_User(req, res, next);

      expect(userRegister).toHaveBeenCalledWith(req.body);
      expect(sendResponse).toHaveBeenCalledWith(res, 201, CUSTOM_CODES.REGISTER_SUCCESS.message, CUSTOM_CODES.REGISTER_SUCCESS.code, null);
      expect(logger.info).toHaveBeenCalledWith(CUSTOM_CODES.REGISTER_SUCCESS.code);
    });

    it('should handle errors', async () => {
      const req = { body: { name: 'Test User', email: 'test@example.com', password: 'password123' } } as Request;
      const res = {} as Response;
      const next = jest.fn() as NextFunction;

      const error = new Error('Service Error');
      (userRegister as jest.Mock).mockRejectedValue(error);

      await Register_User(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(logger.error).toHaveBeenCalledWith(error.message);
    });
  });
});
