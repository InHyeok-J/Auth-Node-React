import * as UserRepository from "../../repositorys/UserRepository";
import env from "../index";

const KakaoStrategy = require("passport-kakao").Strategy;
export default (passport) => {
    console.log("kakaoStrategy");
    passport.use(
        new KakaoStrategy(
            {
                clientID: env.KAKAO_CLIEND_ID,
                callbackURL: "http://localhost:4000/api/Oauth/kakao/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log("code:", codedata);
                // console.log("accessToken:", accessToken);
                // console.log(profile);
                try {
                    const findUser = await UserRepository.findByEmail(
                        profile._json.kakao_account.email
                    );
                    if (findUser[0]) {
                        return done(null, findUser[0], {
                            message: "유저 존재",
                        });
                    }
                    let Data = {
                        email: profile._json.kakao_account.email,
                        name: profile.username,
                    };
                    console.log(Data);
                    const createUser = await UserRepository.createKakao(Data);
                    return done(null, createUser);
                } catch (err) {
                    console.error(err);
                    return done(err);
                }
            }
        )
    );
};
