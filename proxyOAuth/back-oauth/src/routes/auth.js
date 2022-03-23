import { Router } from 'express';
import * as authController from '../controllers/auth';
const router = Router();

router.get('/kakao-login', authController.kakaoCallback);

export default router;
