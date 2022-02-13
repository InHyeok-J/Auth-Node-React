import { Router } from 'express';
import * as authController from '../controllers/auth';
const router = Router();

router.post('/kakao-rest', authController.kakaoLogin);
router.get('/kakao-callback', authController.kakaoCallback);

export default router;
