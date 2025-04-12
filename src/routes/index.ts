import { Router } from "express"
import authRouter from "./authRoutes";
import authRouterV2 from "./v2-authRoutes";

const router = Router();

router.use('/v1/auth',authRouter);
router.use('/v2/auth',authRouterV2);
// router.use('/v1/users',);

export default router;