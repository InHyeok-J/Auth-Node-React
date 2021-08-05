import express from "express";
import * as OAuthService from "../services/OAuthService";
import * as AuthHelper from "../middleware/AuthHelper";
import * as OAuthMiddleware from "../middleware/OauthMiddleware";
import passport from "passport";

const router = express.Router();
//ServerSide코드는 사용 안하는 코드
// router.get("/kakao", OAuthService.kakaoLoginServerSideStart);
// router.get("/kakao/callback", OAuthService.kakaoLoginServerSide);
router.post("/kakao", OAuthMiddleware.KakaoData, OAuthService.KakaoLogin);

export default router;
