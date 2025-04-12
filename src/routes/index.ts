import { Router } from "express"
import authRouter from "./authRoutes";
import patientRouter from "./patientRoutes";

const router = Router();

router.use('/v1/auth',authRouter);
router.use('/v1/patients',patientRouter);

export default router;