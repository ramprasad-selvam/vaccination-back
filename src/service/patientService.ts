import { logger } from "..";
import { CUSTOM_CODES } from "../constants/app.constants";
import { Patient } from "../models/patientModal";
import AppError from "../utils/AppError";


// Service to get scheduled vaccinations
export const getScheduledVaccinations = async (userId: string) => {
    
    
    const patient = await Patient.findOne({userId}).populate('vaccineRecords.vaccineId').populate('vaccineRecords.providerId');

    if (!patient) {
        logger.info(userId,":", CUSTOM_CODES.PATIENT_NOT_FOUND.code )
        throw new AppError(400, CUSTOM_CODES.PATIENT_NOT_FOUND.code, CUSTOM_CODES.PATIENT_NOT_FOUND.message);
    }
    const scheduledVaccinations = patient.vaccineRecords.filter((record: { status: string }) => record.status === 'scheduled');
    if (!scheduledVaccinations.length) {
        logger.info(userId,":", CUSTOM_CODES.PATIENT_SCHEDULED_VACCINE_FAILURE.code )
        throw new AppError(400, CUSTOM_CODES.PATIENT_SCHEDULED_VACCINE_FAILURE.code, CUSTOM_CODES.PATIENT_SCHEDULED_VACCINE_FAILURE.message);
    }
    return scheduledVaccinations;
};

// Service to get completed vaccinations
export const getCompletedVaccinations = async (userId: string) => {
    const patient = await Patient.findOne({userId}).populate('vaccineRecords.vaccineId').populate('vaccineRecords.providerId');
    if (!patient) {
        logger.info(userId,":", CUSTOM_CODES.PATIENT_NOT_FOUND.code )
        throw new AppError(400, CUSTOM_CODES.PATIENT_NOT_FOUND.code, CUSTOM_CODES.PATIENT_NOT_FOUND.message);
    }
    const completedVaccinations = patient.vaccineRecords.filter((record: { status: string }) => record.status === 'completed');
    if (!completedVaccinations) {
        logger.info(userId,":", CUSTOM_CODES.PATIENT_COMPLETED_VACCINE_FAILURE.code )
        throw new AppError(400, CUSTOM_CODES.PATIENT_COMPLETED_VACCINE_FAILURE.code, CUSTOM_CODES.PATIENT_COMPLETED_VACCINE_FAILURE.message);
    }
    return completedVaccinations;
};
