import { NextFunction, Request, Response } from "express";
import { getCompletedVaccinations, getScheduledVaccinations } from "../service/patientService";
import { logger } from "..";
import { sendResponse } from "../utils/handleResponse";
import { CUSTOM_CODES } from "../constants/app.constants";


// Controller to get scheduled vaccinations
export const getScheduledVaccinationsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.auth;
        const scheduledVaccinations = await getScheduledVaccinations(userId);

        logger.info(userId,":", CUSTOM_CODES.PATIENT_SCHEDULED_VACCINE_SUCCESS.code )
        sendResponse(res,200, CUSTOM_CODES.PATIENT_SCHEDULED_VACCINE_SUCCESS.code, CUSTOM_CODES.PATIENT_SCHEDULED_VACCINE_SUCCESS.message, null, scheduledVaccinations)
    } catch (error) {
        next(error)
    }
};

// Controller to get completed vaccinations
export const getCompletedVaccinationsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.auth;
        const completedVaccinations = await getCompletedVaccinations(userId);
        
        logger.info(userId,":", CUSTOM_CODES.PATIENT_COMPLETED_VACCINE_SUCCESS.code )
        sendResponse(res,200, CUSTOM_CODES.PATIENT_COMPLETED_VACCINE_SUCCESS.code, CUSTOM_CODES.PATIENT_COMPLETED_VACCINE_SUCCESS.message, null, completedVaccinations)
    } catch (error) {
        next(error)
    }
};
