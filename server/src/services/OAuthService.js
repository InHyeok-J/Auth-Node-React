import * as UserRepository from "../repositorys/UserRepository";
import passport from "passport";
import statusCode from "../utils/statusCode";
import resutils from "../utils/resutils";

export const kakaoLoginServerSideStart = (req, res, next) => {
    passport.authenticate("kakao", (err, user) => {})(req, res, next);
};

export const kakaoLoginServerSide = (req, res, next) => {
    console.log(req.query.code);
    let codedata = req.query.code;
    global.codedata = codedata;
    passport.authenticate("kakao", (err, user) => {
        console.log("code2:", codedata);
        console.log("user:", user);
        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.status(200).send(JSON.stringify(user));
        });
    })(req, res, next);
};

export const KakaoLogin = (req, res, next) => {
    passport.authenticate("use-Kakao", (err, user) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            return res.status(404).send({ mseeage: "해당 유저 정보 없음" });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res
                .status(200)
                .send(resutils.successData(200, "카카오 로그인 성공", user));
        });
    })(req, res, next);
};
