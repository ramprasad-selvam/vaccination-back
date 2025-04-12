import bcrypt from 'bcryptjs';
import { User } from '../models/userModel';
import { RegisterUserParams } from '../interfaces/interface';
import AppError from '../utils/AppError';
import { generateToken } from '../utils/generateToken';
import { userLogin, userRegister } from './authService';

jest.mock('../models/userModel');
jest.mock('bcryptjs');
jest.mock('../utils/generateToken');

describe('Auth Services', () => {
  describe('userRegister', () => {
    it('should register user successfully', async () => {
      const data: RegisterUserParams = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        phoneNumber: 1234567890,
        age: 30,
        gender: 'male',
        role: 'patient',
      };

      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (User.create as jest.Mock).mockResolvedValue(data);

      const user = await userRegister(data);

      expect(User.findOne).toHaveBeenCalledWith({ email: data.email });
      expect(bcrypt.hash).toHaveBeenCalledWith(data.password, 10);
      expect(User.create).toHaveBeenCalledWith({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: 'hashedpassword',
        age: data.age,
        gender: data.gender,
        role: data.role,
      });
      expect(user).toEqual(data);
    });

    it('should throw an error if user already exists', async () => {
      const data: RegisterUserParams = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        phoneNumber: 1234567890,
        age: 30,
        gender: 'male',
        role: 'patient',
      };

      (User.findOne as jest.Mock).mockResolvedValue(data);

      await expect(userRegister(data)).rejects.toThrow(AppError);
      expect(User.findOne).toHaveBeenCalledWith({ email: data.email });
    });

    it('should throw an error if required fields are missing', async () => {
      const data: RegisterUserParams = {
        name: '',
        email: '',
        password: '',
        phoneNumber: 0,
        age: 0,
        gender: '',
        role: '',
      };

      await expect(userRegister(data)).rejects.toThrow(AppError);
    });
  });

  describe('userLogin', () => {
    it('should login user successfully', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const userMock = {
        _id: 'user123',
        name: 'Test User',
        email,
        password: 'hashedpassword',
        role: 'patient',
      };

      (User.findOne as jest.Mock).mockResolvedValue(userMock);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (generateToken as jest.Mock).mockReturnValue('token123');

      const response = await userLogin(email, password);

      expect(User.findOne).toHaveBeenCalledWith({ email });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, userMock.password);
      expect(generateToken).toHaveBeenCalledWith(userMock._id, userMock.role);
      expect(response).toEqual({
        name: userMock.name,
        role: userMock.role,
        token: 'token123',
      });
    });

    it('should throw an error if user does not exist', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(userLogin(email, password)).rejects.toThrow(AppError);
      expect(User.findOne).toHaveBeenCalledWith({ email });
    });

    it('should throw an error if password is incorrect', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const userMock = {
        _id: 'user123',
        name: 'Test User',
        email,
        password: 'hashedpassword',
        role: 'patient',
      };

      (User.findOne as jest.Mock).mockResolvedValue(userMock);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(userLogin(email, password)).rejects.toThrow(AppError);
      expect(User.findOne).toHaveBeenCalledWith({ email });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, userMock.password);
    });
  });
});
