import express from "express";
import * as AuthService from "../services/AuthService";
import * as AuthHelper from "../middleware/AuthHelper";
const router = express.Router();

router.post("/signup", AuthHelper.isNotLoggedIn, AuthService.signup);
router.post("/login", AuthHelper.isNotLoggedIn, AuthService.login);
router.get("/logout", AuthHelper.isLoggedIn, AuthService.logout);
router.get("/", AuthService.GetUser);

export default router;
