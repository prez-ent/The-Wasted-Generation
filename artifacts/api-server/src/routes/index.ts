import { Router, type IRouter } from "express";
import healthRouter from "./health";
import submissionsRouter from "./submissions";
import meRouter from "./me";
import adminRouter from "./admin";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(submissionsRouter);
router.use(meRouter);
router.use(adminRouter);
router.use(storageRouter);

export default router;
