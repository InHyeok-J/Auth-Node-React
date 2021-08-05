import * as UserRepository from "../../repositorys/UserRepository";
import localStrategy from "./localStrategy";
import kakaoStrategy from "./kakaoStrategy_server";
import KakaoCustomStrategy from "./KakaoCustomStrategy";

export default (passport) => {
    passport.serializeUser((user, done) => {
        console.log("-------serializeUser---------");
        done(null, user);
    });
    passport.deserializeUser(async (user, done) => {
        console.log("-------deserializeUser---------");
        try {
            const findUser = await UserRepository.findByEmail(user.email);
            if (!findUser[0]) done(new Error({ message: "Wrong User Id" }));
            done(null, findUser[0]);
        } catch (err) {
            done(err);
        }
    });
    localStrategy(passport);
    kakaoStrategy(passport);
    KakaoCustomStrategy(passport);
};
