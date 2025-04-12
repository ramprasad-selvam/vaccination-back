// controllers/patientController.test.js
import { Request, Response, NextFunction } from 'express';
import { getScheduledVaccinationsController, getCompletedVaccinationsController } from './patientController';
import { getScheduledVaccinations, getCompletedVaccinations } from '../service/patientService';
import { CUSTOM_CODES } from '../constants/app.constants';

jest.mock('../service/patientService');

describe('Patient Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      auth: { userId: 'userId', role: 'patient'}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  describe('getScheduledVaccinationsController', () => {
    it('should return scheduled vaccinations successfully', async () => {
      const mockVaccinations = [{ status: 'scheduled', vaccineId: {}, providerId: {} }];
      (getScheduledVaccinations as jest.Mock).mockResolvedValue(mockVaccinations);

      await getScheduledVaccinationsController(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        code: CUSTOM_CODES.PATIENT_SCHEDULED_VACCINE_SUCCESS.code,
        message: CUSTOM_CODES.PATIENT_SCHEDULED_VACCINE_SUCCESS.message,
        data: mockVaccinations
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Unexpected error');
      (getScheduledVaccinations as jest.Mock).mockRejectedValue(error);

      await getScheduledVaccinationsController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getCompletedVaccinationsController', () => {
    it('should return completed vaccinations successfully', async () => {
      const mockVaccinations = [{ status: 'completed', vaccineId: {}, providerId: {} }];
      (getCompletedVaccinations as jest.Mock).mockResolvedValue(mockVaccinations);

      await getCompletedVaccinationsController(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        code: CUSTOM_CODES.PATIENT_COMPLETED_VACCINE_SUCCESS.code,
        message: CUSTOM_CODES.PATIENT_COMPLETED_VACCINE_SUCCESS.message,
        data: mockVaccinations
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Unexpected error');
      (getCompletedVaccinations as jest.Mock).mockRejectedValue(error);

      await getCompletedVaccinationsController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
