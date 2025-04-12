import { Router } from "express";
import { getCompletedVaccinationsController, getScheduledVaccinationsController } from "../controllers/patientController";

const patientRouter = Router();

// Route to get scheduled vaccinations
patientRouter.get('/:patientId/scheduled-vaccinations', getScheduledVaccinationsController);

// Route to get completed vaccinations
patientRouter.get('/:patientId/completed-vaccinations', getCompletedVaccinationsController);


export default patientRouter;