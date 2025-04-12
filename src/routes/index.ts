import { Router } from "express"
import authRouter from "./authRoutes";

const router = Router();

router.use('/v1/auth',authRouter);
// router.use('/v1/users',);

export default router;