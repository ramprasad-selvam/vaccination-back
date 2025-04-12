import { Router } from "express";

const patientRouter = Router();


// Route to get scheduled vaccinations
patientRouter.get('/:patientId/scheduled-vaccinations', );

// Route to get completed vaccinations
patientRouter.get('/:patientId/completed-vaccinations', );


export default patientRouter;