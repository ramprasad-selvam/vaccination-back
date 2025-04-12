import { NextFunction, Request, Response } from "express";
import { getCompletedVaccinations, getScheduledVaccinations } from "../service/patientServices";

// Controller to get scheduled vaccinations
exports.getScheduledVaccinations = async (req : Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.auth;
    const scheduledVaccinations = await getScheduledVaccinations(userId);
    res.status(200).json(scheduledVaccinations);
  } catch (error) {
    next(error)
}
};

// Controller to get completed vaccinations
exports.getCompletedVaccinations = async (req : Request, res: Response, next: NextFunction) => {
  try {
    const patientId = req.params.patientId;
    const completedVaccinations = await getCompletedVaccinations(patientId);
    res.status(200).json(completedVaccinations);
} catch (error) {
      next(error)
  }
};
