// service/patientService.test.js
import { getScheduledVaccinations, getCompletedVaccinations } from './patientService';
import { Patient } from '../models/patientModal';
import { CUSTOM_CODES } from '../constants/app.constants';
import AppError from '../utils/AppError';

jest.mock('../models/patientModal');

describe('Patient Service', () => {
  describe('getScheduledVaccinations', () => {
    it('should return scheduled vaccinations successfully', async () => {
      const mockPatient = {
        vaccineRecords: [
          { status: 'scheduled', vaccineId: {}, providerId: {} },
          { status: 'completed', vaccineId: {}, providerId: {} }
        ]
      };
      (Patient.findOne as jest.Mock).mockResolvedValue(mockPatient);

      const result = await getScheduledVaccinations('userId');
      expect(result).toEqual([mockPatient.vaccineRecords[0]]);
    });

    it('should throw an error if patient is not found', async () => {
      (Patient.findOne as jest.Mock).mockResolvedValue(null);

      await expect(getScheduledVaccinations('userId')).rejects.toThrow(AppError);
      await expect(getScheduledVaccinations('userId')).rejects.toThrow(CUSTOM_CODES.PATIENT_NOT_FOUND.message);
    });

    it('should throw an error if no scheduled vaccinations are found', async () => {
      const mockPatient = { vaccineRecords: [] };
      (Patient.findOne as jest.Mock).mockResolvedValue(mockPatient);

      await expect(getScheduledVaccinations('userId')).rejects.toThrow(AppError);
      await expect(getScheduledVaccinations('userId')).rejects.toThrow(CUSTOM_CODES.PATIENT_SCHEDULED_VACCINE_FAILURE.message);
    });
  });

  describe('getCompletedVaccinations', () => {
    it('should return completed vaccinations successfully', async () => {
      const mockPatient = {
        vaccineRecords: [
          { status: 'scheduled', vaccineId: {}, providerId: {} },
          { status: 'completed', vaccineId: {}, providerId: {} }
        ]
      };
      (Patient.findOne as jest.Mock).mockResolvedValue(mockPatient);

      const result = await getCompletedVaccinations('userId');
      expect(result).toEqual([mockPatient.vaccineRecords[1]]);
    });

    it('should throw an error if patient is not found', async () => {
      (Patient.findOne as jest.Mock).mockResolvedValue(null);

      await expect(getCompletedVaccinations('userId')).rejects.toThrow(AppError);
      await expect(getCompletedVaccinations('userId')).rejects.toThrow(CUSTOM_CODES.PATIENT_NOT_FOUND.message);
    });

    it('should throw an error if no completed vaccinations are found', async () => {
      const mockPatient = { vaccineRecords: [] };
      (Patient.findOne as jest.Mock).mockResolvedValue(mockPatient);

      await expect(getCompletedVaccinations('userId')).rejects.toThrow(AppError);
      await expect(getCompletedVaccinations('userId')).rejects.toThrow(CUSTOM_CODES.PATIENT_COMPLETED_VACCINE_FAILURE.message);
    });
  });
});
