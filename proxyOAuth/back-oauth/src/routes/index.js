import { Router } from 'express';
import authRouter from './auth';
import notFoundRouter from './404';

const router = Router();

//auth
router.use('/api/auth', authRouter);
//404 Router Handler
router.use(notFoundRouter);

export default router;
