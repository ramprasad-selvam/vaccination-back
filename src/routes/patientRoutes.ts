import { Router } from "express";
import { getCompletedVaccinationsController, getScheduledVaccinationsController } from "../controllers/patientController";
import verifyToken from "../middleware/authMiddleware";

const patientRouter = Router();

// Route to get scheduled vaccinations
patientRouter.get('/vaccinations/scheduled', verifyToken, getScheduledVaccinationsController);

// Route to get completed vaccinations
patientRouter.get('/vaccinations/completed', verifyToken, getCompletedVaccinationsController);


export default patientRouter;