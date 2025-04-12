import { CUSTOM_CODES } from "../constants/app.constants";
import AppError from "../utils/AppError";

const Patient = require('../models/Patient');

// Service to get scheduled vaccinations
export const getScheduledVaccinations = async (patientId : string) => {
    const patient = await Patient.findById(patientId).populate('vaccineRecords.vaccineId');
    if (!patient) {
      throw new AppError(400, CUSTOM_CODES.PATIENT_SCHEDULED_VACCINE_FAILURE.code, CUSTOM_CODES.PATIENT_SCHEDULED_VACCINE_FAILURE.message );
    }
    const scheduledVaccinations =  patient.vaccineRecords.filter(record => record.status === 'scheduled');
    if (!patient) {
      throw new AppError(400, CUSTOM_CODES.PATIENT_SCHEDULED_VACCINE_FAILURE.code, CUSTOM_CODES.PATIENT_SCHEDULED_VACCINE_FAILURE.message );
    }
};

// Service to get completed vaccinations
export const getCompletedVaccinations = async (patientId : string) => {
    const patient = await Patient.findById(patientId).populate('vaccineRecords.vaccineId');
    if (!patient) {
      throw new Error('Patient not found');
    }
    return patient.vaccineRecords.filter(record => record.status === 'completed');
};
